import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor() { }

  public async downloadSaleInvoice(invoice:any){
    const doc = new jsPDF();
    await this.buildSalePage(doc,invoice);
    doc.addPage();
    await this.buildSalePage(doc,invoice);
    return doc.save("invoice_"+invoice.invoiceId || "Printing_Copy");

  }
  public async downloadSupplyInvoice(invoice:any){
    const doc = new jsPDF();
    await this.buildSupplyPage(doc,invoice);
    doc.addPage();
    await this.buildSupplyPage(doc,invoice);
    return doc.save("invoice_"+invoice.invoiceId || "Printing_Copy");

  }
  async buildSalePage(doc:any,invoice:any) {
    autoTable(doc, {
      body: [
        [
          {
            content: 'Shopon Enterprise',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Invoice :' + invoice.invoiceId || "N/A",
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff'
      }
    });
  
  
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Billed to:'
            +'\n' + invoice.customerName
            +'\n' + invoice.customer.person.contactNo
            +'\n' + invoice.customer.shopName
            +'\n' + invoice.customer.shopAddress,
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'From:'
            +'\nShopon Exterprise'
            +'\nTin Potti, Bogura'
            +'\n' + 'Date: ' + invoice.tnxDate,
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Total Bill:',
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: invoice.totalPayableAmount + " BDT",
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#3366ff'
            }
          }
        ],
        [
          {
            content: invoice.totalPayableAmountInWords,
            styles: {
              halign:'right',
              fontSize: 14,
            }
          }
        ]
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      head: [['SN', 'Product Name', 'Rate', 'Package QNT', 'Loose QNT', 'Total QNT', 'Total Price (BDT)']],
      body:invoice.orders,
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPrice+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: invoice.previousBalance<0?'Previous Due:':'Previous Balance:',
            styles:{
              halign:'right'
            }
          },
          {
            content: Math.abs(invoice.previousBalance)+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Discount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.discount + " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: invoice.chargeReason + ":",
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.extraCharge + " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total Payable Amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPayableAmount+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Paid Amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPaid+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: invoice.dueAmount < 0?'Extra Balance':'Due Amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: Math.abs(invoice.dueAmount)+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });
  
    
    autoTable(doc, {
      body: [
        [
          {
            content: 'Issued By '+ invoice.issuedBy,
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });
  }
  async buildSupplyPage(doc:any,invoice:any) {
    autoTable(doc, {
      body: [
        [
          {
            content: 'Shopon Enterprise',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Invoice :' + invoice.invoiceId || "N/A",
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff'
      }
    });
  
  
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Billed TO:'
            +'\nShopon Exterprise'
            +'\nTin Potti, Bogura'
            +'\n' + 'Date: ' + invoice.tnxDate,
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'From:'
            +'\n' + invoice.supplierName
            +'\n' + invoice.supplyer.person.contactNo
            +'\n' + invoice.supplyer.brandName
            +'\n' + invoice.supplyer.companyName
            +'\n' + invoice.supplyer.shopAddress,
            styles: {
              halign: 'right'
            }
          },
          
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Total Bill:',
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: invoice.totalPrice + " BDT",
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#3366ff'
            }
          }
        ],
        [
          {
            content: invoice.totalPriceInWords,
            styles: {
              halign:'right',
              fontSize: 14,
            }
          }
        ]
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      head: [['SN', 'Product Name', 'Rate', 'Package QNT', 'Loose QNT', 'Total QNT', 'Total Price (BDT)']],
      body:invoice.orders,
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPrice+ " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Discount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.discount + " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total Payable:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPayableAmount + " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });
  
    
    autoTable(doc, {
      body: [
        [
          {
            content: 'Issued By '+ invoice.issuedBy,
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });
  }
}


