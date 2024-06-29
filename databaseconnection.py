from flask import Flask, render_template, request,redirect,url_for,flash
import mysql.connector

app = Flask(__name__, template_folder="templates")

user_data = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ramyadav@0509",
    database="shop"
)

mycursor = user_data.cursor()

mycursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(80) UNIQUE NOT NULL,
        password VARCHAR(120) UNIQUE NOT NULL
    )
""")

# Route to render the login form
@app.route('/')
@app.route('/login_form')
def login_form():
    return render_template('login.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/registered', methods=['GET', 'POST'])
def registered():
    # error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conform_pass = request.form['c-password']                
        check_sql = "select * from users where username = %s"
        check_val = (username,)
        mycursor.execute(check_sql , check_val)
        existing_user = mycursor.fetchone()
        if existing_user:
            error="Username is already exist"
            return render_template('register.html',username_error = error)
        
        if password != conform_pass:
            error="Both password and conform password must be same"
            return render_template('register.html',password_error=error)
        
        sql = "INSERT INTO users (username, password) VALUES (%s, %s)"
        val = (username, password)
        mycursor.execute(sql, val)
        user_data.commit()
    
    return render_template("login.html")

        
@app.route('/login' , methods=['POST' , 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        mycursor.execute("SELECT * FROM users where username = %s and password = %s",(username , password))
        users = mycursor.fetchall()
        # print(users)
        if users:
             return redirect(url_for('index'))
        else:
            error = "Invalid username or password"
            return render_template('login.html',error=error)
      
if __name__ == '__main__':
    app.run(debug=True)
