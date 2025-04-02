const express = require("express") ;
const { Sequelize } = require("sequelize");

const app = express() ;


const sequelize = new Sequelize({
	host: "localhost",
	port: 543,
	dialect: "postgres",
	username: "postgres",
	password: "pass",
	logging: false,
});

async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log("pakdliya tera hath !");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

connectToDB() ;




const User = sequelize.define("User" , {
	id : {
		type : DataTypes.INTEGER,
		primary : true
		autoIncrement: true
	},
	managerId : {
		type : DataTypes.integer ,
		references : {
			model : User ,
			key : "id"
		}
	},

	employeeID : {
		type : DataTypes.integer ,
		references : {
			model : User ,
			key : "id"
		}
	},
})



app.get("/" , (req , res) => {
	res.send("hello")
})

app.listen(3000 , () => conosle.log("app is live on port 3000"))
