from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route('/login')
def home():
   print("Login Page Render....")
   url_for('static', filename='style.css')
   return render_template('login.html')

if __name__ == '__main__':
   app.run(debug=True)