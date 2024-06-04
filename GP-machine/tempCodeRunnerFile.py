import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_absolute_error
# from sklearn.ensemble import RandomForestRegressor

# # Load the dataset
# data = pd.read_csv(r'C:\Users\DELL\Desktop\New Text Document.csv', encoding='latin1')

# # Clean up column names
# data.columns = data.columns.str.strip()

# # Separate features (X) and target variable (y)
# # Include both 'Danger' and 'State' in the features
# X = data[['Danger', 'State']]
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
# # Example prediction for a new instance with both 'Danger' and 'State'
# new_instance = pd.DataFrame({'Danger': [7], 'State': [0]})  # Replace 'YourState' with the actual state
# predicted_duration = model.predict(new_instance)

# print(f'Predicted Duration for the new instance: {predicted_duration[0]}')