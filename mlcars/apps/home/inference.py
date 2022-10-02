import mlflow
import numpy as np
from os import environ
from apps.config import config_dict
from datetime import datetime


def process_form(form):
    # --- 1) First process condition
    # min/max year
    min_year, max_year = [datetime.now().year-2000, 0]
    try:
        min_year = datetime.now().year-int(form['listyearmin'])
    except:
        pass
    try:
        max_year = datetime.now().year-int(form['listyearmax'])
    except:
        pass
    nb_years = [min_year, max_year] if min_year<max_year else [max_year, min_year]
    # min/max mileage
    min_mileage, max_mileage = 2000, 200000
    try:
        min_mileage = int( condition_miles_for_integer(form['carmiles1']) )
    except:
        pass
    try:
        max_mileage = int( condition_miles_for_integer(form['carmiles2']) )
    except:
        pass
    mileage = [min_mileage, max_mileage] if min_mileage<max_mileage else [max_mileage, min_mileage]
    # Make dictionary
    man_dict = {'nb_years': nb_years, 'mileage': mileage}

    # Check if model was selected
    if form['listmodel'] != 'Model':
        # No criterion will be considered from the "category" column
        man_dict['model'] = form['car-model']
    else:
        if form['listmake'] != 'Make':
            man_dict['make'] = form['listmake']
        if form['listbodytype'] != 'Body type':
            man_dict['bodytype'] = form['listbodytype']
        if form['listbodysize'] != 'Body size':
            man_dict['bodysize'] = form['listbodysize']
        if form['listorigin'] != 'Origin':
            man_dict['Origin'] = form['listorigin']
        man_dict['Luxury'] = True if (form['listluxury'] == 'on') else False

    return man_dict

def get_trained_model(criteria):
    # Get configuration
    conf = config_dict['Dev']

    # Load model as a PyFuncModel.
    environ['MLFLOW_TRACKING_URI'] = conf.MLFLOW_SERVER_URI
    logged_model = conf.MLFLOW_DEFAULT_MODEL
    loaded_model = mlflow.pyfunc.load_model(logged_model)
    return loaded_model



# ========================= #
# ===----- HELPERS -----=== #
# ========================= #
def condition_miles_for_integer(mileage):
    # Check type
    if not isinstance(mileage, str):
        raise TypeError('Mileage should be a string at this point')

    # Remove blanks
    mileage = mileage.replace(' ', '')

    # Replace K with 1e3
    mileage = mileage.lower()
    mileage = mileage.replace('k', '000')
    return mileage

def prepare_chart(pred):
    # Compute mean, std
    mu, dev = np.mean(pred), np.std(pred)
    # Prep bins
    bins = np.arange(-2,3) * dev + mu
    bins = round_to_hundreds(bins)
    # Middle marks
    midmarks = np.append( np.append([0], (bins[1:] + bins[:-1])/2), 9e9 )
    # Get histogram
    hst = np.ndarray([0])
    for i_ in range( len(midmarks)-1 ):
        hst = np.append( hst, np.sum( (pred>midmarks[i_]) & (pred<=midmarks[i_+1])) )
    lab = ['SnatchIt!', 'Low', 'Fair', 'Moderate', 'High']
    return list(bins), list(hst), lab

class DummyModel():
    def __init__(self, *args, **kwargs):
        self.name = "Random distribution generator"
        self.nout = 1000

    def fit(self, *args, **kwargs):
        pass

    def predict(self, *args, **kwargs):
        mu = np.random.random() * 1e4 + 2e4
        dev = 1e4
        output = np.random.randn(self.nout) * dev + mu
        return output

def round_to_hundreds(vec):
    if not isinstance(vec, np.ndarray):
        raise TypeError('The vector to round should be a numpy array')
    vec = np.round( vec * 1e-2 ) * 1e2
    return vec