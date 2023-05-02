from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Kocham dockera <3!'

if __name__ == '__main__':
    app.run()
