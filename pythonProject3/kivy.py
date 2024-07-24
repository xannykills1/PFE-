import tkinter.ttk
from tkinter import *
from PIL import ImageTk, Image
import webbrowser
import customtkinter
import re
import sqlite3
import os
from tkinter import messagebox
from tkinter import ttk
from cryptography.fernet import Fernet
from tkinter import simpledialog

customtkinter.set_appearance_mode("dark")
fen = customtkinter.CTk()
fen.title('TsukiStock')
fen.geometry('520x520')


logo_image = Image.open("icons/logo.png").resize((150, 150))
logoic = ImageTk.PhotoImage(logo_image)

cat_image = Image.open("icons/logo.png").resize((150, 150))
newpic = ImageTk.PhotoImage(cat_image)

p1 = Image.open("icons/p1.png").resize((200, 200))
p1p = ImageTk.PhotoImage(p1)

p2 = Image.open("icons/p2.png").resize((200, 200))
p2p = ImageTk.PhotoImage(p2)

p3 = Image.open("icons/p3.png").resize((200, 200))
p3p = ImageTk.PhotoImage(p3)

p4 = Image.open("icons/p4.png").resize((200, 200))
p4p = ImageTk.PhotoImage(p4)


DATABASE_FILE = 'database.db'
qte1_y_offset = 0
prod1_y_offset = 0
price1_y_offset = 0
total_label = 0
tree = None
tree2 = None

def history12():
    global tree2
    help_label1 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label1.place(x=0, y=180)

    if tree2:
        tree2.lift()


    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='#2b2929',
                                       command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='#2b2929',
                                       command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='#2b2929',command=history1)
    history.place(x=760, y=190)

    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='blue',command=history12)
    histor1.place(x=940, y=190)
    purchase23 = customtkinter.CTkButton(fen, text="Out", font=("Bold", 20), fg_color='#2b2929', command=openpurchase1)
    purchase23.place(x=1140, y=190)
    remove1 = customtkinter.CTkButton(fen, text='Remove', width=150, font=("Bold", 20), fg_color='blue',
                                      command=remove_selected_item12)
    remove1.place(x=200, y=350)
    populate_history_treeview()
def history1():
    global tree2

    # Clear the existing label content
    help_label1 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label1.place(x=0, y=180)

    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='#2b2929',
                                       command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='#2b2929',
                                       command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='blue')
    history.place(x=760, y=190)

    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='#2b2929',command=history12)
    histor1.place(x=940, y=190)

    purchase23 = customtkinter.CTkButton(fen, text="Out", font=("Bold", 20), fg_color='#2b2929', command=openpurchase1)
    purchase23.place(x=1140, y=190)

    # Create an entry box
    my_entry = Entry(fen, font=("Helvetica", 20), width=55)
    my_entry.place(x=400, y=280)

    # Create a treeview
    my_tree = ttk.Treeview(fen)
    my_tree["columns"] = ("ID", "Name", "Company", "Price", "Quantity","existing_status")
    my_tree.column("#0", width=0, stretch=NO)  # Hide the first column
    my_tree.column("ID", anchor=CENTER, width=100)
    my_tree.column("Name", anchor=CENTER, width=200)
    my_tree.column("Company", anchor=CENTER, width=222)
    my_tree.column("Price", anchor=CENTER, width=100)
    my_tree.column("Quantity", anchor=CENTER, width=100)
    my_tree.column("existing_status", anchor=CENTER, width=104)
    my_tree.heading("#0", text="", anchor=CENTER)
    my_tree.heading("ID", text="ID", anchor=CENTER)
    my_tree.heading("Company", text="Product Name", anchor=CENTER)
    my_tree.heading("Name", text="Company", anchor=CENTER)
    my_tree.heading("Quantity", text="Price", anchor=CENTER)
    my_tree.heading("Price", text="Quantity", anchor=CENTER)
    my_tree.heading("existing_status", text="Status", anchor=CENTER)
    my_tree.place(x=400, y=320)

    # Function to fill out the entry box with selected item from the treeview
    def fillout(e):
        selected_item = my_tree.focus()
        item_data = my_tree.item(selected_item, 'values')
        my_entry.delete(0, END)
        my_entry.insert(0, item_data[1])  # Insert the name into entry box
        # Show information about the selected item
        show_info(item_data)

    # Function to search for products or suppliers
    def search_database(query):
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Search in products table
        cursor.execute("SELECT * FROM products WHERE name LIKE ? OR company_name LIKE ? OR ID LIKE ?",
                       ('%' + query + '%', '%' + query + '%', '%' + query + '%'))
        product_results = cursor.fetchall()

        # Search in suppliers table
        cursor.execute("SELECT * FROM suppliers WHERE company_name LIKE ?", ('%' + query + '%',))
        supplier_results = cursor.fetchall()

        conn.close()

        # Combine product and supplier results
        results = product_results + supplier_results
        return results

    # Function to display information about the selected item
    def show_info(item_data):
        info_label=Label(fen)
        info_label.place(x=100,y=100)
        info_label.configure(text='')  # Clear previous content
        if item_data:
            if len(item_data) == 5:  # Product data
                info_label.configure(
                    text=f"Product ID: {item_data[0]}\nName: {item_data[1]}\nCompany Name: {item_data[2]}\nPrice: {item_data[3]}\nQuantity: {item_data[4]}")
            elif len(item_data) == 5:  # Supplier data
                info_label.configure(
                    text=f"Supplier ID: {item_data[0]}\nCompany Name: {item_data[1]}\nContact Name: {item_data[2]}\nPhone: {item_data[3]}\nEmail: {item_data[4]}")

    # Function to handle entry box input
    def check(e):
        # Grab what was typed
        typed = my_entry.get()

        # Perform database search
        if typed == '':
            data = []  # Empty list if no input
        else:
            data = search_database(typed.lower())
            # Update the treeview with search results
            update(data)

    # Function to update the treeview with search results
    def update(data):
        # Clear the treeview
        my_tree.delete(*my_tree.get_children())
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        # Add items to treeview
        for item in data:
            if len(item) == 5:  # Supplier data
                # Check if the supplier exists in the suppliers table
                cursor.execute("SELECT 1 FROM suppliers WHERE company_name = ?", (item[1],))
                exists = cursor.fetchone() is not None
                status = "Exists" if exists else "Doesn't Exist"
                my_tree.insert("", END, values=item + (status,))
        conn.close()

    # Bindings
    my_tree.bind("<Double-1>", fillout)
    my_entry.bind("<KeyRelease>", check)

def openpurchase():
    global cname, cperson, cnumber
    global supplier_tree

    if supplier_tree is None:
        populate_supplier_treeview()  # Populate the treeview if it's not initialized

    if supplier_tree:
        supplier_tree.lift()  # Lift the treeview to the front if it already exists

    # Add a button to calculate the bill
    help_label = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label.place(x=0, y=180)

    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='#2b2929',
                                       command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='blue',
                                       command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='#2b2929', command=history1)
    history.place(x=760, y=190)
    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='#2b2929',command=history12)
    histor1.place(x=940, y=190)
    purchase23 = customtkinter.CTkButton(fen, text="Out", font=("Bold", 20), fg_color='#2b2929', command=openpurchase1)
    purchase23.place(x=1140, y=190)

    frame2 = customtkinter.CTkFrame(fen, width=300, height=500, fg_color='#2b2929')
    frame2.place(x=150, y=250)

    cname = customtkinter.CTkEntry(fen, height=40, width=200, placeholder_text='Company Name')
    cname.place(x=200, y=290)

    cperson = customtkinter.CTkEntry(fen, height=40, width=200, placeholder_text='Contact Person')
    cperson.place(x=200, y=380)

    cnumber = customtkinter.CTkEntry(fen, height=40, width=200, placeholder_text='Contact Number')
    cnumber.place(x=200, y=470)

    add1 = customtkinter.CTkButton(fen, text='Add', width=100, fg_color='#242424', command=add_product1)
    add1.place(x=180, y=600)

    undo1 = customtkinter.CTkButton(fen, text='Remove Last', width=100, fg_color='#242424',
                                    command=remove_last_product1)
    undo1.place(x=300, y=600)

    remove1 = customtkinter.CTkButton(fen, text='Remove', width=100, fg_color='#242424', command=remove_selected_item1)
    remove1.place(x=240, y=650)

    # Ensure supplier_tree is not None before attempting to lift it
    if supplier_tree:
        supplier_tree.lift()

    populate_supplier_treeview()
    populate_supplier_combobox()
def save_input_to_txt(user_input):
    try:
        with open('Reason.txt', 'a') as file:
            file.write(user_input + '\n')
    except Exception as e:
        print(f"Error occurred while saving input to file: {str(e)}")

def remove_selected_item12():
    global tree2

    # Check if any item is selected in the treeview
    selected_item = tree2.selection()
    if not selected_item:
        messagebox.showinfo("No Selection", "Please select an item to remove.")
        return

    # Prompt the user for input
    user_input = simpledialog.askstring("Input Required", "Enter The Reason:")
    if not user_input:
        messagebox.showinfo("No Input", "Please enter something before proceeding.")
        return

    # Confirm deletion with a messagebox
    confirm = messagebox.askokcancel("Confirm Deletion", f"Are you sure you want to remove the selected item(s)? Input entered: {user_input}")

    if confirm:
        # Connect to the database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        try:
            # Delete each selected item from the database and the treeview
            for item in selected_item:
                item_id = tree2.item(item)['text']
                cursor.execute("SELECT product_name, quantity FROM cart WHERE id=?", (item_id,))
                row = cursor.fetchone()
                product_name = row[0]
                removed_quantity = row[1]

                # Update the stock in the 'products' table by adding back the removed quantity
                cursor.execute("UPDATE products SET stock = stock + ? WHERE name = ?", (removed_quantity, product_name))

                # Delete the item from the 'cart' table
                cursor.execute("DELETE FROM cart WHERE id=?", (item_id,))
                tree2.delete(item)

            conn.commit()
            messagebox.showinfo("Success", "Selected item(s) removed successfully.")

            # Save user input to a text file
            save_input_to_txt(user_input)
        except Exception as e:
            messagebox.showerror("Error", f"Error occurred: {str(e)}")
        finally:
            # Close the database connection
            conn.close()
def remove_selected_item1():
    global supplier_tree

    # Check if any item is selected in the treeview
    selected_item = supplier_tree.selection()
    if not selected_item:
        messagebox.showinfo("No Selection", "Please select a supplier to remove.")
        return

    # Confirm deletion with a messagebox
    confirm = messagebox.askokcancel("Confirm Deletion", "Are you sure you want to remove the selected supplier(s)?")

    if confirm:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        try:
            # Delete each selected supplier from the database and the treeview
            for item in selected_item:
                supplier_id = supplier_tree.item(item)['text']
                cursor.execute("DELETE FROM suppliers WHERE id=?", (supplier_id,))
                supplier_tree.delete(item)

            conn.commit()
            messagebox.showinfo("Success", "Selected supplier(s) removed successfully.")
        except Exception as e:
            messagebox.showerror("Error", f"Error occurred: {str(e)}")
        finally:
            # Close the database connection
            conn.close()
def remove_last_product1():
    # Ask for confirmation using a messagebox
    confirm = messagebox.askokcancel("Confirm Deletion", "Are you sure you want to remove the last product?")

    if confirm:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Delete the last added product
        cursor.execute("DELETE FROM suppliers WHERE ROWID = (SELECT MAX(ROWID) FROM suppliers)")
        conn.commit()

        # Close the database connection
        conn.close()

        # Refresh the Treeview to reflect the changes
        populate_supplier_treeview()
def openpurchase1():
    global quantity
    def addtocart():
        global qte1_y_offset, prod1_y_offset, price1_y_offset, prix12_frame, copnmbr, copnmbr2

        selected_product = product2.get()
        bill_details3 = f"{selected_product}"
        product_quantity = int(quantity.get())
        copnmbr = compnum.get()
        copnmbr2 = namep.get()
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        try:
            # Fetch the unit price and available quantity of the selected product from the database
            cursor.execute("SELECT price, stock FROM products WHERE id=?", (selected_product,))
            row = cursor.fetchone()
            unit_price = row[0]  # Fetch the unit price from the result
            available_quantity = row[1]  # Fetch the available quantity

            if available_quantity < product_quantity:
                messagebox.showinfo("Insufficient Quantity", "Insufficient quantity available!")
                return  # Exit the function if insufficient quantity is available

            # Calculate the total price by multiplying the unit price with quantity
            total_price = unit_price * product_quantity

            # Insert cart information into the database
            cursor.execute(
                "INSERT INTO cart (company_number, full_name, product_name, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?)",
                (copnmbr, copnmbr2, selected_product, product_quantity, unit_price, total_price))

            # Deduct the quantity of the selected product from the database
            updated_quantity = available_quantity - product_quantity
            cursor.execute("UPDATE products SET stock=? WHERE id=?", (updated_quantity, selected_product))

            conn.commit()

            # Display success message

        finally:
            # Close the database connection
            conn.close()

        prix12_frame = Frame(fen, bg='#2b2929')  # Create a new frame for the price label
        prix12_frame.place(x=1010, y=420 + qte1_y_offset)
        prix123_frame = Frame(fen, bg='#2b2929')  # Create a new frame for the price label
        prix123_frame.place(x=870, y=420 + qte1_y_offset)
        # Create labels for product details
        prod1 = Label(prix123_frame, text=bill_details3, fg='white', font=('Arial', 15), bg='#2b2929')
        prod1_y_offset += 30
        prod1.pack()

        prod = Label(fen, text='Product', fg='white', font=('Arial', 15), bg='#2b2929')
        prod.place(x=850, y=390)

        product_quantity = int(quantity.get())  # Convert quantity to integer
        bill_details2 = f"{product_quantity}"


        qte1 = Label(prix12_frame, text=bill_details2, fg='white', font=('Arial', 15), bg='#2b2929')
        qte1_y_offset += 30
        qte1.pack()

        qte = Label(fen, text='Quantity', fg='white', font=('Arial', 15), bg='#2b2929')
        qte.place(x=990, y=390)



        prix = Label(fen, text='Price', fg='white', font=('Arial', 15), bg='#2b2929')
        prix.place(x=1150, y=390)

        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Fetch the unit price of the selected product
        cursor.execute("SELECT price FROM products WHERE id=?", (selected_product,))
        unit_price = cursor.fetchone()[0]  # Fetch the unit price from the result

        # Close the database connection
        conn.close()

        # Calculate the total price by multiplying the unit price with quantity
        total_price = unit_price * product_quantity

        prix1 = Label(fen, text=str(total_price), fg='white', font=('Arial', 15), bg='#2b2929')
        prix1.place(x=1150, y=420 + price1_y_offset)

        # Increment the vertical offset for price labels
        price1_y_offset += 30

    def calculate_bill():
        global copnmbr, copnmbr2
        chrta1 = Label(fen, text='------------------------------------------------------', font=('Arial', 20),
                       fg='white', bg='#2b2929')
        chrta1.place(x=805, y=300)
        chrta2 = Label(fen, text='------------------------------------------------------', font=('Arial', 20),
                       fg='white',
                       bg='#2b2929')
        chrta2.place(x=805, y=600)
        total = Label(fen, text='Total:', font=('Arial', 15),
                      fg='white',
                      bg='#2b2929')
        total.place(x=1100, y=650)

        copnmbr = compnum.get()
        copnmbr2 = namep.get()
        bill_details = f"Company Number: {copnmbr}"
        copnmbr1 = Label(fen, text=bill_details, fg='white', bg='#2b2929')
        copnmbr1.place(x=850, y=650)
        bill_details1 = f"Full Name: {copnmbr2}"
        copnmbr2 = Label(fen, text=bill_details1, fg='white', bg='#2b2929')
        copnmbr2.place(x=850, y=270)

        total_price = 0
        for widget in fen.winfo_children():
            if isinstance(widget, Label) and widget.cget('text') != 'Price':
                try:
                    total_price += float(widget.cget('text'))
                except ValueError:
                    pass

        # Display total price
        total_label = Label(fen, text=f'Total: {total_price}', font=('Arial', 15), fg='white', bg='#2b2929')
        total_label.place(x=1100, y=650)

    def populate_combobox():
        # Clear any existing values in the Combobox
        product2['values'] = ()

        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Fetch products from the database
        cursor.execute("SELECT id FROM products")
        products = cursor.fetchall()

        # Extract product names from the fetched data
        product_names = [product[0] for product in products]

        # Populate the Combobox with product names
        product2['values'] = product_names

        # Close the database connection
        conn.close()

    # Add a button to calculate the bill
    help_label = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label.place(x=0, y=180)

    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='#2b2929',
                                       command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='#2b2929',
                                       command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='#2b2929', command=history1)
    history.place(x=760, y=190)
    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='#2b2929', command=history12)
    histor1.place(x=940, y=190)
    purchase23 = customtkinter.CTkButton(fen, text="Out", font=("Bold", 20), fg_color='blue', command=openpurchase1)
    purchase23.place(x=1140, y=190)
    frame2 = customtkinter.CTkFrame(fen, width=500, height=500, fg_color='#2b2929')
    frame2.place(x=150, y=250)
    frame3 = customtkinter.CTkFrame(fen, width=500, height=500, fg_color='#2b2929')
    frame3.place(x=800, y=250)

    namep = customtkinter.CTkEntry(fen, height=40, width=200)
    namep.place(x=200, y=350)
    namep1 = customtkinter.CTkLabel(fen, text='Full Name', font=('bold', (20)), height=40, width=200, fg_color='#2b2929')
    namep1.place(x=200, y=300)

    compnum = customtkinter.CTkEntry(fen, height=40, width=200,font=("Helvatica",20),)
    compnum.place(x=200, y=450)
    compnum1 = customtkinter.CTkLabel(fen, text=' Company Number', font=('bold', (20)), height=40, width=200,
                                      fg_color='#2b2929')
    compnum1.place(x=200, y=400)

    quantity = customtkinter.CTkEntry(fen, height=40, width=200)
    quantity.place(x=200, y=650)
    quantity1 = customtkinter.CTkLabel(fen, text='Quantity', font=('bold', (20)), height=40, width=200,
                                      fg_color='#2b2929')
    quantity1.place(x=200, y=600)
    product2 = tkinter.ttk.Combobox(fen,width=12,font=("Helvatica",20))
    product2.place(x=200,y=550)
    prodcut3 = customtkinter.CTkLabel(fen, text='Product', font=('bold', (20)), height=40, width=200,
                                       fg_color='#2b2929')
    prodcut3.place(x=200, y=500)

    cart1 = customtkinter.CTkButton(fen, text='Add to cart',command=addtocart, font=("Bold", 20))
    cart1.place(x=460,y=400)
    cart3 = customtkinter.CTkButton(fen, text='Clear',command=clear, font=("Bold", 20))
    cart3.place(x=460, y=600)
    calculate_button = customtkinter.CTkButton(fen, text="Calculate Bill", font=("Bold", 20),
                                               command=calculate_bill)
    calculate_button.place(x=460, y=500)
    populate_combobox()

def openproducts():
    global tree, name, stock, price, supllier1
    help_label1 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label1.place(x=0, y=180)
    # Lift the treeview to the top
    if tree:
        tree.lift()

    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='blue',
                                       command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='#2b2929',
                                       command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='#2b2929', command=history1)
    history.place(x=760, y=190)
    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='#2b2929',command=history12)
    histor1.place(x=940, y=190)
    purchase23 = customtkinter.CTkButton(fen, text="Out", font=("Bold", 20), fg_color='#2b2929', command=openpurchase1)
    purchase23.place(x=1140, y=190)
    frame2 = customtkinter.CTkFrame(fen, width=300, height=500, fg_color='#2b2929')
    frame2.place(x=150, y=250)

    supllier1 = ttk.Combobox(fen,width=12, state="readonly", font="Verdana 16 bold")
    supllier1.place(x=200,y=290)
    supllier1.set('Suppliers')

    name = customtkinter.CTkEntry(fen, height=40, width=200,placeholder_text='Name')
    name.place(x=200, y=380)

    stock = customtkinter.CTkEntry(fen, height=40, width=200,placeholder_text='Stock')
    stock.place(x=200, y=470)

    price = customtkinter.CTkEntry(fen, height=40, width=200,placeholder_text='Price')
    price.place(x=200, y=550)

    add = customtkinter.CTkButton(fen, text='Add', width=100, fg_color='#242424', command=add_product)
    add.place(x=180, y=600)
    undo = customtkinter.CTkButton(fen, text='Remove Last', width=100, fg_color='#242424', command=remove_last_product)
    undo.place(x=300, y=600)
    remove = customtkinter.CTkButton(fen, text='Remove', width=100, fg_color='#242424', command=remove_selected_item)
    remove.place(x=240, y=650)

    # Call the function to populate the ComboBox
    populate_supplier_combobox()
    populate_treeview()

# Define the function to populate the ComboBox
def populate_supplier_combobox():
    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Query the database to fetch supplier names
        cursor.execute("SELECT company_name FROM suppliers")
        suppliers = cursor.fetchall()

        # Close the database connection
        conn.close()

        # Clear existing items in the ComboBox
        supllier1['values'] = ()

        # Add fetched supplier names to the ComboBox
        supllier1['values'] = [supplier[0] for supplier in suppliers]

        # Debug prints
    except Exception as e:
        print("Error fetching supplier data:", e)
populate_supplier_combobox()
def remove_last_product():
    # Ask for confirmation using a messagebox
    confirm = messagebox.askokcancel("Confirm Deletion", "Are you sure you want to remove the last product?")

    if confirm:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()

        # Delete the last added product
        cursor.execute("DELETE FROM products WHERE ROWID = (SELECT MAX(ROWID) FROM products)")
        conn.commit()

        # Close the database connection
        conn.close()

        # Refresh the Treeview to reflect the changes
        populate_treeview()


conn = sqlite3.connect('database.db')
cursor = conn.cursor()

def fetch_products():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    conn.close()
    return products

def fetch_product_history():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cart")
    product_history = cursor.fetchall()
    conn.close()
    return product_history
def populate_history_treeview():
    global tree2

    # Create the Treeview if not created already
    if tree2 is None:
        tree2 = ttk.Treeview(fen, height=20, style="Treeview")
        tree2['columns'] = ('Company Number', 'Full Name', 'Product Name', 'Quantity', 'Unit Price', 'Total Price')
        tree2.column('#0', width=50, anchor='center')  # Adjust the width of the ID column
        tree2.column('Company Number', width=120, anchor='center')
        tree2.column('Full Name', width=120, anchor='center')
        tree2.column('Product Name', width=150, anchor='center')
        tree2.column('Quantity', width=100, anchor='center')
        tree2.column('Unit Price', width=100, anchor='center')
        tree2.column('Total Price', width=100, anchor='center')
        tree2.heading('#0', text='ID')
        tree2.heading('Company Number', text='Company Number')
        tree2.heading('Full Name', text='Full Name')
        tree2.heading('Product Name', text='Product Name')
        tree2.heading('Quantity', text='Quantity')
        tree2.heading('Unit Price', text='Unit Price')
        tree2.heading('Total Price', text='Total Price')
        tree2.place(x=500, y=250)
    else:
        # Clear existing items in the treeview
        for item in tree2.get_children():
            tree2.delete(item)

    # Fetch product history from the database
    product_history = fetch_product_history()
    print("Fetched product history:", product_history)  # Debugging

    # Insert fetched product history into the treeview
    for history_entry in product_history:
        print("Inserting history entry:", history_entry)  # Debugging
        tree2.insert('', 'end', text=history_entry[0], values=(history_entry[1], history_entry[2],
                                                               history_entry[3], history_entry[4],
                                                               history_entry[5], history_entry[6]))

def remove_selected_item():
    global tree

    # Check if any item is selected in the treeview
    selected_item = tree.selection()
    if not selected_item:
        messagebox.showinfo("No Selection", "Please select an item to remove.")
        return

    # Confirm deletion with a messagebox
    confirm = messagebox.askokcancel("Confirm Deletion", "Are you sure you want to remove the selected item(s)?")

    if confirm:
        # Connect to the database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        try:
            # Delete each selected item from the database and the treeview
            for item in selected_item:
                item_id = tree.item(item)['text']
                cursor.execute("DELETE FROM products WHERE id=?", (item_id,))
                tree.delete(item)

            conn.commit()
            messagebox.showinfo("Success", "Selected item(s) removed successfully.")
        except Exception as e:
            messagebox.showerror("Error", f"Error occurred: {str(e)}")
        finally:
            # Close the database connection
            conn.close()


# Define a function to populate the treeview with product data
style = ttk.Style()
style.configure("Treeview", background="white",foregroud='black',fieldbackgroud="black")
style.map("Treeview",backgroud=[('selected','red')])

def populate_treeview():
    global tree

    # Create the Treeview if not created already
    if tree is None:
        tree = ttk.Treeview(fen, height=20, style="Treeview")
        tree['columns'] = ('Company_Name','Name', 'in_stock', 'price')
        tree.column('#0', width=50, anchor='center')
        tree.column('Company_Name', width=250, anchor='center')
        tree.column('Name', width=250, anchor='center')
        tree.column('in_stock', width=250, anchor='center')
        tree.column('price', width=250, anchor='center')
        tree.heading('#0', text='ID')
        tree.heading('Company_Name', text='Company Name')
        tree.heading('Name', text='Name')
        tree.heading('in_stock', text='Stock')
        tree.heading('price', text='Price')
        tree.place(x=530, y=250)
    else:
        # Clear existing items in the treeview
        for item in tree.get_children():
            tree.delete(item)

    # Fetch products from the database
    products = fetch_products()

    # Insert fetched products into the treeview
    for product in products:
        tree.insert('', 'end', text=product[0], values=(product[1], product[2], product[3], product[4]))

        # Check if stock is under 50
        if int(product[3]) < 50:
            company_name = product[1]
            product_name = product[2]
            messagebox.showwarning("Low Stock", f"Low stock for product '{product_name}' of company '{company_name}'")
supplier_tree = None
def populate_supplier_treeview():
    global supplier_tree

    # Create the Treeview if not created already
    if supplier_tree is None:
        supplier_tree = ttk.Treeview(fen, height=20, style="Treeview")
        supplier_tree['columns'] = ('Company Name', 'Contact Person', 'Contact Number')
        supplier_tree.column('#0', width=50, anchor='center')  # Adjust the width of the ID column
        supplier_tree.column('Company Name', width=250, anchor='center')
        supplier_tree.column('Contact Person', width=250, anchor='center')
        supplier_tree.column('Contact Number', width=250, anchor='center')
        supplier_tree.heading('#0', text='ID')
        supplier_tree.heading('Company Name', text='Company Name')
        supplier_tree.heading('Contact Person', text='Contact Person')
        supplier_tree.heading('Contact Number', text='Contact Number')
        supplier_tree.place(x=530, y=250)
    else:
        # Clear existing items in the treeview
        for item in supplier_tree.get_children():
            supplier_tree.delete(item)

    # Fetch suppliers from the database
    suppliers = fetch_suppliers()

    # Insert fetched suppliers into the treeview
    for supplier in suppliers:
        supplier_tree.insert('', 'end', text=supplier[0], values=(supplier[1], supplier[2], supplier[3]))

def fetch_suppliers():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM suppliers")
    suppliers = cursor.fetchall()
    conn.close()
    return suppliers

def openhome():

    # Create a Toplevel window for the help label

    # Add text to the help label
    help_text = """
    
    
                    Tsuki Stock est une entreprise spécialisée dans la distribution de produits diversifiés.
                    
                     La gestion des stocks est un enjeu majeur pour l’entreprise, qui doit s'assurer de 
                     
                     la disponibilité des produits tout en minimisant les coûts de stockage. 
                    """
    help_label1 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label1.place(x=0, y=180)
    help_label3 = Label(fen, text=help_text, font=("Arial", 14), justify="left", height=0, width=0, bg="#242424",
                       fg="white")
    help_label3.place(x=0, y=300)
    name3= Label(fen,text='TsukiStock',font=('Bold',25),bg='#242424',fg='white')
    name3.place(x=95,y=250)
    logo1 = Label(fen, image=p1p, bg='#242424')

    logo1.place(x=100, y=550)
    logo2 = Label(fen, image=p2p, bg='#242424')

    logo2.place(x=400, y=550)
    logo3 = Label(fen, image=p3p, bg='#242424')

    logo3.place(x=700, y=550)
    logo4 = customtkinter.CTkButton(fen,text='' ,image=p4p,fg_color='#242424',hover_color='#242424')

    logo4.place(x=1000, y=550)
    help_button = customtkinter.CTkButton(fen, text="Help", font=("Bold", 20), fg_color='#242424',
                                          hover_color='#242424', command=openhelp)
    help_button.place(x=500, y=70)
    home_button = customtkinter.CTkButton(fen, text="Home", font=("Bold", 20), fg_color='#3b41b3',
                                          hover_color='#242424', command=openhome)
    home_button.place(x=200, y=70)
    manage_button = customtkinter.CTkButton(fen, text="Manage", font=("Bold", 20), fg_color='#242424',
                                            hover_color='#242424', command=openmanage)
    manage_button.place(x=350, y=70)



def openhelp():
    # Create a Toplevel window for the help label

    # Add text to the help label
    help_text = """
     
                            Something happened ? Why dont you call us and we Will Handle everything :D
                            
                            this is our support line and : 0570931614
        
        """
    help_label9 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label9.place(x=0, y=180)
    help_label4 = Label(fen, text=help_text, font=("bold", 13), justify="left",bg="#242424",fg="white")
    help_label4.place(x=0,y=160)
    help_button = customtkinter.CTkButton(fen, text="Help", font=("Bold", 20), fg_color='#3b41b3',
                                          hover_color='#242424', command=openhelp)
    help_button.place(x=500, y=70)
    manage_button = customtkinter.CTkButton(fen, text="Manage", font=("Bold", 20), fg_color='#242424',
                                            hover_color='#242424', command=openmanage)
    manage_button.place(x=350, y=70)
    home_button = customtkinter.CTkButton(fen, text="Home", font=("Bold", 20), fg_color='#242424',
                                          hover_color='#242424', command=openhome)
    home_button.place(x=200, y=70)


def add_product():
    global name, stock, price, supllier1

    # Retrieve data from entry widgets
    product_name = name.get()
    product_stock = stock.get()
    product_price = price.get()
    companyname = supllier1.get()

    # Connect to the database
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()

    # Check if the product already exists
    cursor.execute("SELECT * FROM products WHERE company_name=? AND name=?", (companyname, product_name))
    existing_product = cursor.fetchone()

    if existing_product:
        # If product already exists, get its current stock and update with new stock
        current_stock = existing_product[3]  # Index 3 is the stock column
        updated_stock = current_stock + int(product_stock)
        # Update the database with the combined stock amount
        cursor.execute("UPDATE products SET stock=?, price=? WHERE company_name=? AND name=?",
                       (updated_stock, product_price, companyname, product_name))
    else:
        # Insert the product into the database
        cursor.execute("INSERT INTO products (company_name, name, stock, price) VALUES (?, ?, ?, ?)",
                       (companyname, product_name, product_stock, product_price))

    conn.commit()
    conn.close()

    # Refresh the Treeview to reflect the changes
    populate_treeview()

    # Define function to remove a product from the database
def add_product1():
    global cname, cperson, cnumber, tree

    # Retrieve data from entry widgets
    company_name = cname.get()
    company_stock = cperson.get()
    company_price = cnumber.get()

    # Connect to the database
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()

    # Insert the product into the database
    cursor.execute("INSERT INTO suppliers (company_name, contact_person, contact_number) VALUES (?, ?, ?)",
                   (company_name, company_stock, company_price))
    conn.commit()

    # Close the database connection
    conn.close()

    # Refresh the Treeview to reflect the changes
    populate_supplier_treeview()


# Define function to remove a product from the database

def openmanage():
    help_label5 = Label(fen, font=("Arial", 14), justify="left", height=40, width=160, bg='#242424')
    help_label5.place(x=0, y=180)
    products = customtkinter.CTkButton(fen, text="Products", font=("Bold", 20), fg_color='#2b2929',command=openproducts)
    products.place(x=400, y=190)

    purchase = customtkinter.CTkButton(fen, text="Supplier", font=("Bold", 20), fg_color='#2b2929',command=openpurchase)
    purchase.place(x=580, y=190)

    history = customtkinter.CTkButton(fen, text="Search", font=("Bold", 20), fg_color='#2b2929', command=history1)
    history.place(x=760, y=190)
    histor1 = customtkinter.CTkButton(fen, text="History", font=("Bold", 20), fg_color='#2b2929',command=history12)
    histor1.place(x=940, y=190)
    purchase23 = customtkinter.CTkButton(fen, text="Buy", font=("Bold", 20), fg_color='#2b2929', command=openpurchase1)
    purchase23.place(x=1140, y=190)
    manage_button = customtkinter.CTkButton(fen, text="Manage", font=("Bold", 20), fg_color='#3b41b3',
                                            hover_color='#242424', command=openmanage)
    manage_button.place(x=350, y=70)
    help_button = customtkinter.CTkButton(fen, text="Help", font=("Bold", 20), fg_color='#242424',
                                          hover_color='#242424', command=openhelp)
    help_button.place(x=500, y=70)
    home_button = customtkinter.CTkButton(fen, text="Home", font=("Bold", 20), fg_color='#242424',
                                          hover_color='#242424', command=openhome)
    home_button.place(x=200, y=70)
def logout():
    # Define a function to confirm logout
    def confirm_logout():
        result = messagebox.askyesno("Confirmation", "Are you sure you want to logout?")
        if result:
            fen.destroy()  # Close the current Tkinter window
            os.system('python kivy.py')


    # Call the function to confirm logout
    confirm_logout()
# Function to validate login against the database
def validate_login():
    # Get the email and password entered
    email = loginentry.get()
    password = passwordentry.get()
    remember = check1_var.get()

    # Validate email format
    if not validate_email(email):
        error_label.config(text="Invalid email format", font=("Bold", 10))
        return

    # Connect to the database
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()

    # Query the database for the entered credentials
    cursor.execute("SELECT * FROM accounts WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()

    if user:
        # Save login information if "Remember me" is checked
        save_credentials(email, password)
        # Destroy login widgets
        destroy_login_widgets()
        # Display a new label and button

        fen.after(0, lambda: fen.state('zoomed'))
        logo_label = Label(fen, bg='#242424')
        logo_label.place(x=10, y=5)
        logo = Label(fen, image=logoic, bg='#242424')

        logo.place(x=0, y=0)
        # Define the buttons
        home_button = customtkinter.CTkButton(fen, text="Home", font=("Bold", 20), fg_color='#242424',
                                              hover_color='#242424',command=openhome)
        home_button.place(x=200, y=70)

        manage_button = customtkinter.CTkButton(fen, text="Manage", font=("Bold", 20), fg_color='#242424',
                                                hover_color='#242424',command=openmanage)
        manage_button.place(x=350, y=70)

        help_button = customtkinter.CTkButton(fen, text="Help", font=("Bold", 20), fg_color='#242424',
                                              hover_color='#242424',command=openhelp)
        help_button.place(x=500, y=70)

        logout_button = customtkinter.CTkButton(fen, text="Log Out", font=("Bold", 20), fg_color='#242424',
                                                hover_color='#242424', command=logout)
        logout_button.place(x=650, y=70)


        openhome()
        # Start the Tkinter event loop
        fen.mainloop()

    else:
        error_label.config(text="Email/password incorrect")


    # Close the database connection
    conn.close()
def open_signup():
    # Add any necessary actions related to sign-up here
    # For example, you might want to open a new window or perform other operations
    # In this case, we'll simply import and execute file2

    import file2
    file2.execute_signup()
# Function to destroy login widgets
def destroy_login_widgets():
    for widget in [loginentry, passwordentry, check1, btn1, error_label, forgotpass, signup, ors, cna, pic]:
        widget.destroy()
def clear():
    global qte1_y_offset, prod1_y_offset, price1_y_offset

    # Reset the vertical offset for qte1 labels
    qte1_y_offset = 0
    prod1_y_offset = 0
    price1_y_offset = 0


    # Remove all existing qte1 labels
    for widget in fen.winfo_children():
        if isinstance(widget, Label) and widget.cget('text') == 'Quantity':
            widget.destroy()

    # Clear the total price label
    for total_label in fen.winfo_children():
        if isinstance(total_label, Label) and widget.cget('text').startswith('Total:'):
            total_label.config(text='')  # Set the text of the label to 'Total: $0'

    # Recreate the frame to clear its contents
    frame3 = customtkinter.CTkFrame(fen, width=500, height=500, fg_color='#2b2929')
    frame3.place(x=800, y=300)
    total_label = 0

# Function to save login information
def save_credentials(email, password):
    key = Fernet.generate_key()
    cipher_suite = Fernet(key)
    encrypted_email = cipher_suite.encrypt(email.encode())
    encrypted_password = cipher_suite.encrypt(password.encode())
    with open(LOGIN_INFO_FILE, 'wb') as file:
        file.write(key + b'\n')
        file.write(encrypted_email + b'\n')
        file.write(encrypted_password)


def load_credentials():
    try:
        with open(LOGIN_INFO_FILE, 'rb') as file:
            key = file.readline().strip()
            encrypted_email = file.readline().strip()
            encrypted_password = file.readline().strip()
            cipher_suite = Fernet(key)
            email = cipher_suite.decrypt(encrypted_email).decode()
            password = cipher_suite.decrypt(encrypted_password).decode()
            return email, password
    except FileNotFoundError:
        return None, None

# Function to validate email format
def validate_email(email):
    # Regular expression for email validation
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email)

# Function to open a new tab for password recovery
def open_forgot_password(email_entry):
    webbrowser.open_new("index.html")

# Load saved login information
LOGIN_INFO_FILE = "load_login_info.key"

# Create login widgets
loginentry = customtkinter.CTkEntry(fen, height=40, width=350, placeholder_text='Email')
loginentry.place(x=90, y=230)

passwordentry = customtkinter.CTkEntry(fen, height=40, width=350, show='*', placeholder_text='Password')
passwordentry.place(x=90, y=290)

email, password = load_credentials()
if email and password:
    loginentry.insert(0, email)
    passwordentry.insert(0, password)

check1_var = BooleanVar(value=True)
check1 = customtkinter.CTkCheckBox(fen, text='Remember me', variable=check1_var)
check1.place(x=90, y=340)

btn1 = customtkinter.CTkButton(fen, text='Sign in', width=100, font=("Book Antiqua", 20), command=validate_login)
btn1.place(x=210, y=380)

error_label = Label(fen, text="", fg="red", bg='#242424')
error_label.place(x=90, y=205)

forgotpass = customtkinter.CTkButton(fen, text="Forgot password ?", fg_color='#242424', hover_color='#242424',
                                     command=lambda: open_forgot_password(loginentry))
forgotpass.place(x=310, y=330)

signup = customtkinter.CTkButton(fen, text="Sign up", fg_color='#242424', hover_color='#242424', command=open_signup)
signup.place(x=240, y=448)

ors = Label(fen, text="--- OR ---", bg='#242424', fg="white")
ors.place(x=230, y=420)

cna = Label(fen, text="Create new account", bg='#242424', fg="white")
cna.place(x=160, y=450)

pic = Label(fen, image=newpic,bg='#242424')
pic.place(x=180, y=30)



if __name__ == "__main__":
    fen.mainloop()


