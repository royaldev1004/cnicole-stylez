import type { WorksheetService } from "./worksheet-services";

export type WorksheetLineItem = {
  service: WorksheetService;
  checked: boolean;
  quantity: number;
};

export type WorksheetPdfInput = {
  clientName: string;
  date: string;
  lineItems: WorksheetLineItem[];
  notes: string;
  logoUrl?: string;
};

const LOGO_MAX_DIMENSION = 240; // px — plenty crisp for an 18mm print placement, keeps the PDF small

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);

    const scale = Math.min(1, LOGO_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

export function lineItemAmount(item: WorksheetLineItem): number {
  return item.quantity * item.service.rate;
}

export function worksheetTotal(lineItems: WorksheetLineItem[]): number {
  return lineItems.filter((li) => li.checked).reduce((sum, li) => sum + lineItemAmount(li), 0);
}

export async function generateWorksheetPdf(input: WorksheetPdfInput): Promise<void> {
  const [{ default: jsPDF }, { autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  const doc = new jsPDF();
  const marginX = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  let cursorY = 20;

  const textX = input.logoUrl ? marginX + 24 : marginX;

  if (input.logoUrl) {
    const dataUrl = await loadImageAsDataUrl(input.logoUrl);
    if (dataUrl) {
      doc.addImage(dataUrl, "PNG", marginX, cursorY - 8, 18, 18);
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("C Nicole Stylez", textX, cursorY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Client Service Worksheet", textX, cursorY + 6);

  cursorY += 22;
  doc.setFontSize(11);
  doc.text(`Client: ${input.clientName || "—"}`, marginX, cursorY);
  doc.text(`Date: ${input.date || "—"}`, pageWidth - marginX, cursorY, { align: "right" });

  cursorY += 8;

  const checkedItems = input.lineItems.filter((li) => li.checked);
  const rows = checkedItems.map((li) => {
    const rateLabel = li.service.unit === "hr" ? `$${li.service.rate}/hr` : `$${li.service.rate}`;
    const qtyLabel = li.service.unit === "hr" ? `${li.quantity} hr` : `${li.quantity}`;
    const label = li.service.note ? `${li.service.label} (${li.service.note})` : li.service.label;
    return [label, rateLabel, qtyLabel, `$${lineItemAmount(li).toFixed(2)}`];
  });

  autoTable(doc, {
    startY: cursorY,
    head: [["Service", "Rate", "Hours / Qty", "Amount"]],
    body: rows.length ? rows : [["No services selected", "—", "—", "—"]],
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [22, 20, 15] },
    margin: { left: marginX, right: marginX },
  });

  const afterTableY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? cursorY + 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total: $${worksheetTotal(input.lineItems).toFixed(2)}`, pageWidth - marginX, afterTableY + 10, {
    align: "right",
  });

  if (input.notes.trim()) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Notes", marginX, afterTableY + 22);
    doc.setFont("helvetica", "normal");
    const noteLines = doc.splitTextToSize(input.notes, pageWidth - marginX * 2);
    doc.text(noteLines, marginX, afterTableY + 28);
  }

  const safeClient = (input.clientName || "client").trim().replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const safeDate = input.date || "worksheet";
  doc.save(`cnicole-worksheet-${safeClient}-${safeDate}.pdf`);
}
