HOW DOES MONGOOSE HANDLE QUERY EXECUTION UNDER THE HOOD.

1. When the mongoose.connect() method is called , it creates a single connection pool, in which there will be specified number of connections using which we can execute the queries.
2. The pool size can be given in options configuration of mongoose.connect("URL",{poolSize:10}). So 10 connections will be created in the pool.
3. The query execution is allocated by mongoDB native driver, to the connections in the connection pool which are available.
4. Under the hood i,e mongoose , there is a mongoDB native driver that converts the mongoose query to actualy corresponding MongoDB query and interacts with the MONGOdb server.
5. It returns the RAW data from the server and maps to the schema (model) to form a json like response.

DIFFERENCES BETWEEN MATCH AND VALIDATOR IN SCHEMA OPTIONS.

Validator:
Use Case: It’s used when you need more complex validation, such as checking if a value exists in the database, comparing values across multiple fields, or validating a non-trivial condition.

age: {
type: Number,
required: true,
validator: async function(value) {
return await User.find({value}) // Custom validation: age must be 18 or older
},
message: 'Age must be at least 18',
},

Match:
Use match when you have a simple pattern you want to validate against (e.g., email, phone numbers, URLs).

email: {
type: String,
required: true,
match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
}
