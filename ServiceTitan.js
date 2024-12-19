function addService() {
    const services = document.getElementById('services');
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.innerHTML = `
        <div class="form-group">
            <label for="service-description">Service Description</label>
            <select class="service-description" required>
                <option value="">Select Service</option>
                <option value="Plumbing">Plumbing</option>
                <option value="HVAC">HVAC</option>
                <option value="Electrical">Electrical</option>
            </select>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" class="quantity" min="1" required>
        </div>
        <div class="form-group">
            <label for="rate">Rate ($)</label>
            <input type="number" class="rate" min="0" step="0.01" required>
        </div>
        <button type="button" class="remove-service" onclick="removeService(this)">Remove</button>
    `;
    services.appendChild(serviceItem);
}

function removeService(button) {
    const serviceItem = button.parentElement;
    serviceItem.remove();
}

function generateInvoice() {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const serviceItems = document.querySelectorAll('.service-item');

    let subtotal = 0;
    const servicesTable = document.getElementById('preview-services');
    servicesTable.innerHTML = '';

    serviceItems.forEach(item => {
        const description = item.querySelector('.service-description').value;
        const quantity = parseFloat(item.querySelector('.quantity').value);
        const rate = parseFloat(item.querySelector('.rate').value);
        const total = quantity * rate;
        subtotal += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${description}</td>
            <td>${quantity}</td>
            <td>${rate.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
        `;
        servicesTable.appendChild(row);
    });

    const taxRate = parseFloat(document.getElementById('tax').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const tax = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + tax - discount;

    document.getElementById('preview-name').innerText = name;
    document.getElementById('preview-address').innerText = address;
    document.getElementById('preview-subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('preview-tax').innerText = tax.toFixed(2);
    document.getElementById('preview-discount').innerText = discount.toFixed(2);
    document.getElementById('preview-grand-total').innerText = grandTotal.toFixed(2);

    document.getElementById('invoice-preview').style.display = 'block';
}

function clearForm() {
    document.getElementById('invoice-form').reset();
    document.getElementById('invoice-preview').style.display = 'none';
    const services = document.getElementById('services');
    services.innerHTML = '';
    addService();
}

function printInvoice() {
    const invoiceContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="text-align: center;">Invoice</h1>
            <p><strong>Customer Name:</strong> ${document.getElementById('preview-name').innerText}</p>
            <p><strong>Customer Address:</strong> ${document.getElementById('preview-address').innerText}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Rate ($)</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Total ($)</th>
                    </tr>
                </thead>
                <tbody>${document.getElementById('preview-services').innerHTML}</tbody>
            </table>
            <p style="text-align: right; margin-top: 20px;"><strong>Subtotal:</strong> $${document.getElementById('preview-subtotal').innerText}</p>
            <p style="text-align: right;"><strong>Tax:</strong> $${document.getElementById('preview-tax').innerText}</p>
            <p style="text-align: right;"><strong>Discount:</strong> $${document.getElementById('preview-discount').innerText}</p>
            <p style="text-align: right;"><strong>Grand Total:</strong> $${document.getElementById('preview-grand-total').innerText}</p>
        </div>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Invoice</title></head><body>' + invoiceContent + '</body></html>');
    printWindow.document.close();
    printWindow.print();
}

document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
