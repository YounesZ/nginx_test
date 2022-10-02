import numpy as np
from flask import Flask, render_template, request, jsonify
from apps.home.inference import process_form, get_trained_model, prepare_chart

# Make app
app = Flask(__name__,
            template_folder='apps/templates',
            static_folder='apps/static')

@app.route('/')
def mainpage():
    if request.method=='POST':
        pass
    else:
        return render_template('home/index.html')

@app.route('/navbar')
def navbar():
    return render_template('includes/navigation.html')

@app.route('/oracleinfer', methods=['POST'])
def inference():
    # Format form
    criteria = process_form(request.form)
    # Get prediction
    loaded_model = get_trained_model(criteria)
    import pandas as pd
    cols = ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']
    df = pd.DataFrame(data=np.random.random([1000, 4]), columns=cols)

    prediction = loaded_model.predict(df) + 0.34
    X, Y, Xlab = prepare_chart(prediction)
    return jsonify({'X': X, 'Y': Y, 'Xlab':Xlab})

if __name__ == '__main__':
    app.run()
