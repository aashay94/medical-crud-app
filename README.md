# Question:

Create UI forms and link them to perform CRUD operation for the below described use case. Use your own mock API for data calls.

### Medical Billing Master
Medical Billing	Amount	Max Discount	Modality
CT BRAIN	2000	100 INR	CT
CT PNS	1000	200 INR	CT
MRI BRAIN	3000	300 INR	MRI
MRI PNS	2400	30%	MRI
GLUCOSE FASTING	130	10%	LAB
SUGAR TESTING	300	5%	LAB

### Modality Slot Details:
Modality	No of Slots per day
CT 	7
MRI	6
LAB	INFINITY

### Module 1: Patient Demography & Billing Details:

###Fields: 
Salutation, name, gender, DOB, age, age Type, appointment date, phone number, Address, Billing details.

Kindly review the above image.  Create form as per the above mock to save the patient details and their billing details.  As per that image you must place the respective UI control and wire them. Use the table mentioned above for medical billing list and slot availability. 
        
		1). Create autocomplete search for billing list field and show the information from the above table “Medical Billing Master”. 
		
        2). On selecting any billing name from the autocomplete show the billing amount as per the mock.  
		
        3). Allow the user to give discount for each medical billing based on discount criteria given in the above table
		
        4). Once the user clicks the add button then add it to the table view as per the mock
		
        5). As per mock enable the delete option to remove the added billing.
		
        6). On clicking the save button then call a mock API which would save the data. 
		

Need to add below validations for the respective UI controls.

###Validations:

1.1) On salutation change the gender should reflect automatically. For e.g.: Mr. should be Male and Mrs., Ms. should be female

1.2) On DOB change the age & age type should reflect respectively and vice versa. 

1.3) All other fields are mandatory.

1.4) At least one medical billing should be selected in the list.

1.5). Discount amount should be an integer and greater than zero and lesser than the amount mentioned under “Max Discount” in the above table.

1.6). Validate the slots for each Modality like CT, MRI, Lab ...etc. Refer to the above table “Modality Slot Details” for more information. If the slot exceeds then alert the message to the user. For e.g.: in a day only 7 CT billings are allowed. If user adds 8th CT billing then system should validate it.


### Steps to run the app -

1. Navigate to the folder ->
 
   npm init
   
   npm start to start the frontend
   
2. Navigate to the backend folder ->

	npm init
	
	node app.js to start the backend folder

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
