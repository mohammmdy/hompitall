# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_absolute_error
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')
# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['disease']]
# y = data['duration']

# # Apply one-hot encoding to the categorical variable 'disease'
# preprocessor = ColumnTransformer(
#     transformers=[('disease', OneHotEncoder(handle_unknown='ignore'), ['disease'])],
#     remainder='passthrough'
# )
# X_encoded = preprocessor.fit_transform(X)

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# # Create and train the linear regression model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the duration for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'disease': ['ازمة']})
# new_instance_encoded = preprocessor.transform(new_instance)
# predicted_duration = model.predict(new_instance_encoded)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')
# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import mean_absolute_error
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')

# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['disease']]
# y = data['duration']

# # Apply one-hot encoding to the categorical variable 'disease'
# preprocessor = ColumnTransformer(
#     transformers=[('disease', OneHotEncoder(handle_unknown='ignore'), ['disease'])],
#     remainder='passthrough'
# )

# # Ensure the one-hot encoding is applied consistently to training and testing data
# X_encoded = preprocessor.fit_transform(X)
# X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# # Create and train the random forest regression model
# model = RandomForestRegressor(random_state=42)
# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the duration for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'disease': ['عيون']})

# # Ensure consistent one-hot encoding for the new instance
# new_instance_encoded = preprocessor.transform(new_instance)
# predicted_duration = model.predict(new_instance_encoded)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')

# ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import mean_absolute_error
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')

# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['disease', 'Danger']]
# y = data['duration']

# # Apply one-hot encoding to the categorical variable 'disease'
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('disease', OneHotEncoder(handle_unknown='ignore'), ['disease']),
#         # You can add more transformers for other categorical columns if needed
#     ],
#     remainder='passthrough'
# )

# # Ensure the one-hot encoding is applied consistently to training and testing data
# X_encoded = preprocessor.fit_transform(X)
# X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# # Create and train the random forest regression model
# model = RandomForestRegressor(random_state=42)
# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the duration for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'disease': ['جلطة'], 'Danger': [4]})  # Adjust '1' based on your actual data
# new_instance_encoded = preprocessor.transform(new_instance)
# predicted_duration = model.predict(new_instance_encoded)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')
##///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_absolute_error
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')

# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['disease', 'Danger']]  # Include the 'Danger' column
# y = data['duration']

# # Apply one-hot encoding to the categorical variable 'disease'
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('disease', OneHotEncoder(handle_unknown='ignore'), ['disease']),
#         # You can add more transformers for other categorical columns if needed
#     ],
#     remainder='passthrough'
# )
# X_encoded = preprocessor.fit_transform(X)

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# # Create and train the linear regression model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the duration for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'disease': ['ازمة قلبية'], 'Danger': [5]})  # Update '1' based on your actual data
# new_instance_encoded = preprocessor.transform(new_instance)
# predicted_duration = model.predict(new_instance_encoded)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')
# ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.tree import DecisionTreeRegressor
# from sklearn.metrics import mean_absolute_error
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')

# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['disease', 'Danger']]  # Include the 'Danger' column
# y = data['duration']

# # Apply one-hot encoding to the categorical variable 'disease'
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('disease', OneHotEncoder(handle_unknown='ignore'), ['disease']),
#         # You can add more transformers for other categorical columns if needed
#     ],
#     remainder='passthrough'
# )
# X_encoded = preprocessor.fit_transform(X)

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# # Create and train the decision tree regression model
# # model = DecisionTreeRegressor(random_state=42)
# model = DecisionTreeRegressor(random_state=42, max_depth=3, min_samples_split=5, min_samples_leaf=2)

# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the duration for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'disease': ['ازمة قلبية'], 'Danger': [5]})
# new_instance_encoded = preprocessor.transform(new_instance)
# predicted_duration = model.predict(new_instance_encoded)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')
##/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error, r2_score
# from sklearn.preprocessing import StandardScaler

# # Load the data from the CSV file with a different encoding
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin-1')

# # Strip whitespace from column names
# data.columns = data.columns.str.strip()

# # Extract features (Disease and Danger) and target variable (duration)
# X = data[['Disease', 'Danger']]
# y = data['duration']

# # Convert categorical variables to numerical using one-hot encoding
# X = pd.get_dummies(X, columns=['Disease'], drop_first=True)

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Standardize the features
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)

# # Use the same column order for the new_data DataFrame as in X_train
# new_data_disease = 'تسمم'  # Replace with the actual category in Arabic
# new_data = pd.DataFrame({'Disease': [new_data_disease], 'Danger': [6]})  # Replace with your own values
# new_data = pd.get_dummies(new_data, columns=['Disease'], drop_first=True)

# # Ensure the new_data DataFrame has the same columns as X_train in the same order
# new_data = new_data.reindex(columns=X_train.columns, fill_value=0)

# # Scale the features
# new_data_scaled = scaler.transform(new_data)

# # Train a linear regression model
# model = LinearRegression()
# model.fit(X_train_scaled, y_train)

# # Make predictions on the test set
# y_pred = model.predict(X_test)

# # Evaluate the model
# mse = mean_squared_error(y_test, y_pred)
# r2 = r2_score(y_test, y_pred)

# print(f'Mean Squared Error: {mse}')
# print(f'R-squared: {r2}')

# # Make predictions for the new data
# predicted_duration = model.predict(new_data_scaled)

# print('Predicted Duration:', predicted_duration)
#------------------------------------------------------------------------------------------------- bestttttttttttt  (GB1)
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_absolute_error
# from sklearn.ensemble import RandomForestRegressor

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')
# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['Danger']]
# y = data['duration']

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Create and train the random forest regressor model
# model = RandomForestRegressor(random_state=42)
# model.fit(X_train, y_train)

# # Make predictions on the testing set
# predictions = model.predict(X_test)

# # Evaluate the model
# mae = mean_absolute_error(y_test, predictions)
# print(f'Mean Absolute Error: {mae}')

# # Now you can use the trained model to predict the 'duration' for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'Danger': [7]})  # Replace with your own value
# predicted_duration = model.predict(new_instance)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')
##---------------------------------------------------------------------------------------------------------------------------------------------------------------------------bestttttttttttt  (GB2)
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.ensemble import RandomForestRegressor
from tabulate import tabulate  # Importing tabulate

# Load the dataset
data = pd.read_csv(r'F:\GB\GP-machine\hh\gg.csv', encoding='latin1')

# Clean up column names
data.columns = data.columns.str.strip()

# print(data.head(100).to_string(index=False))
# print(tabulate(data.head(100), headers='keys', tablefmt='pretty', showindex=False))


# Separate features (X) and target variable (y)
# Include both 'Danger' and 'State' in the features
X = data[['diseaseNum', 'Danger']]
y = data['duration']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the random forest regressor model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Make predictions on the testing set
predictions = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, predictions)
print(f'Mean Absolute Error: {mae}')

# Calculate and print accuracy
accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy}')

# Now you can use the trained model to predict the 'duration' for disease
# Example prediction for a disease with both 'diseaseNum' and 'State'
# diseaseNum
# 0 -> (غيبوبة)   1--->(نزيف)  
# 2--> (ذبحة صدرية)   3----> (جلطة)   
# 4--> (ازمة قلبية)    5---->(تسمم)  
# 6--->(حادث)      7----> (حروق)
# 8--->(عيون)     9--->(نسا وتوليد)
# Danger 0 for state  1 for danger
disease = pd.DataFrame({'diseaseNum': [9], 'Danger': [0]})  # Replace 'YourState' with the actual state
predicted_duration = model.predict(disease)

print(f'Predicted Duration for the disease: {predicted_duration[0]} minute')

#-------------------------


##----------------------------------------------------------------------------------------------- 2d besttttttttttttttt
# import pandas as pd
# from sklearn.model_selection import train_test_split, GridSearchCV
# from sklearn.metrics import mean_absolute_error
# from sklearn.ensemble import RandomForestRegressor

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')
# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# X = data[['Danger']]
# y = data['duration']

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Define the parameter grid
# param_grid = {
#     'n_estimators': [50, 100, 150],      # try different numbers of trees
#     'max_depth': [None, 10, 20, 30],     # try different max depths
#     'min_samples_split': [2, 5, 10],     # try different min samples split
#     'min_samples_leaf': [1, 2, 4]         # try different min samples leaf
# }

# # Create the grid search model
# grid_search = GridSearchCV(RandomForestRegressor(random_state=42), param_grid, cv=5, scoring='neg_mean_absolute_error', n_jobs=-1)

# # Fit the grid search model to the data
# grid_search.fit(X_train, y_train)

# # Get the best parameters
# best_params = grid_search.best_params_

# # Use the best parameters to create a new model
# best_model = RandomForestRegressor(random_state=42, **best_params)

# # Train the model with the best parameters
# best_model.fit(X_train, y_train)

# # Make predictions on the testing set
# best_predictions = best_model.predict(X_test)

# # Evaluate the model
# best_mae = mean_absolute_error(y_test, best_predictions)
# print(f'Best Mean Absolute Error: {best_mae}')

# # Now you can use the trained model to predict the 'duration' for new instances
# # Example prediction for a new instance
# new_instance = pd.DataFrame({'Danger': [7]})  # Replace with your own value
# predicted_duration = best_model.predict(new_instance)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')

