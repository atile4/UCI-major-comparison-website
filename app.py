from flask import Flask, render_template, url_for, request, redirect, flash
from utils.table_maker import makeTableList
from utils.name_validation import checkMajors

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
    error = checkMajors(major1, major2)
    if error:
        flash(error, "error")
        return redirect(url_for('index'))
    
    # Make full tables (with both headers and courses)
    table1 = makeTableList(major1)
    table2 = makeTableList(major2)
    
    overlap = set([row for row in table1 if " : " in row]) & set([row for row in table2 if " : " in row])
    
    return render_template('list.html', major1=major1, major2=major2, table1 = table1, table2 = table2, overlap = overlap)

if __name__ == "__main__":
    app.run(debug=True)
