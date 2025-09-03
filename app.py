from flask import Flask, render_template, url_for, request, redirect, flash
from utils.table_maker import makeTableList

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Needed for flash messages

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/compare', methods=['POST'])
def compare_majors():
    major1 = request.form.get('major1', '').strip()
    major2 = request.form.get('major2', '').strip()

    # Server-side validation
    if not major1 or not major2:
        flash("Please select both majors before submitting.", "error")
        return redirect(url_for('index'))

    if major1.lower() == major2.lower():
        flash("Please select two different majors.", "error")
        return redirect(url_for('index'))
    
    # Make full tables (with both headers and courses)
    table1 = makeTableList(major1)
    table2 = makeTableList(major2)
    
    overlap = set([row for row in table1 if " : " in row]) & set([row for row in table2 if " : " in row])
    
    return render_template('list.html', major1=major1, major2=major2, table1 = table1, table2 = table2, overlap = overlap)

if __name__ == "__main__":
    app.run(debug=True)
