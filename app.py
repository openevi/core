import datetime

from flask import Flask, render_template, send_file

app = Flask('Opevi open-source personal data respectful tools')
APPLICATIONS = [
    {'name': 'EviPad', 'short_name': 'evipad', 'description': 'Simple text writer, write and share PDF'},
    {'name': 'EviTalk', 'short_name': 'evitalk', 'description': 'Store your files and share it !'},
    {'name': 'EviFiles', 'short_name': 'evifiles', 'description': 'Open and session and talk with your friends'},
    {'name': 'EviCal', 'short_name': 'evical', 'description': 'Imports calendar and get notified !'}
]

USERS = [
    {'name': 'EVIADMIN', 'password': bytes, 'apps': ['evipad', 'evitalk', 'evical'], 'picture': '/static/assets/favopevi.png'},
    {'name': 'Armand', 'password': bytes, 'apps': ['evipad', 'evitalk', 'evical'], 'picture': '/static/assets/favopevi.png'},
    {'name': 'Ondine', 'password': bytes, 'apps': ['evitalk', 'evical'], 'picture': '/static/assets/favopevi.png'}
]

CONFS = {
    'evipad': {'need_logged': True},
    'evitalk': {'need_logged': True, 'demo_users': True},
    'evical': {'need_logged': True}
}


def render(template_string):
    return render_template(template_string, CONFS=CONFS, USERS=USERS, APPLICATIONS=APPLICATIONS)


@app.route('/')
def home():
    return render('home.html')


@app.route('/app/evipad')
def pad():
    return render('pad.html')


@app.route('/app/evipad/help')
def pad_help():
    return render('pad_help.html')


@app.route('/app/evitalk')
def talk():
    return render('talk.html')


@app.route('/app/evifiles')
def files():
    return render('files.html')


@app.route('/app/evical')
def evipad():
    return render('date.html')


@app.route('/favicon.ico')
def favicon():
    return send_file('static/assets/favopevi.png')


def get_string_date():
    return datetime.datetime.now().strftime("%A, %d of %B %Y")


app.jinja_env.globals.update(date=get_string_date)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=11455)
