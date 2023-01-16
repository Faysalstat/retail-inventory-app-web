import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor() { }

  public downloadInvoice(invoice:any){
    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: 'Company brand',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Invoice',
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
            content: 'Reference:' + invoice.doNo
            +'\nDate: ' + invoice.tnxDate
            +'\nInvoice number: ' + invoice.invoiceId,
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
            content: 'Billed to:'
            +'\n' + invoice.customer.shopName
            +'\n' + invoice.customer.person.contactNo
            +'\n' + invoice.customer.person.personAddress,
            // +'\nBilling Address line 2'
            // +'\nZip code - City'
            // +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          // {
          //   content: 'Shipping address:'
          //   +'\nJohn Doe'
          //   +'\nShipping Address line 1'
          //   +'\nShipping Address line 2'
          //   +'\nZip code - City'
          //   +'\nCountry',
          //   styles: {
          //     halign: 'left'
          //   }
          // },
          {
            content: 'From:'
            +'\nCompany name'
            +'\nShipping Address line 1'
            +'\nZip code - City'
            +'\nCountry',
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
      body: [
        [
          {
            content: 'Products',
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      head: [['SN', 'Product Name', 'Rate', 'Quantity', 'Total']],
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
            content: 'Due Amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: invoice.totalPayableAmount - invoice.totalPaid + " BDT",
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'Terms & notes',
    //         styles: {
    //           halign: 'left',
    //           fontSize: 14
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
    //         +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
    //         +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    //         styles: {
    //           halign: 'left'
    //         }
    //       }
    //     ],
    //   ],
    //   theme: "plain"
    // });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Issued By MANAGER',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });

    return doc.save("invoice_"+invoice.invoiceId);

  }
}
