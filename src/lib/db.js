import mysql from "mysql2/promise"

export async function query({query, values=[]}) {
    console.log(process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST,"HOST,DB")
    try{
    const dbConnection = await mysql.createConnection({
        host: process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST,
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
        user:process.env.NEXT_PUBLIC_MYSQL_USER,
        password:process.env.NEXT_PUBLIC_MYSQL_PASSWORD
    }); 
    
    dbConnection.connect()
    const [res] = await dbConnection.execute(query,values);
    
    dbConnection.end();

    return res
    // dbConnection.execute()
    }
     catch(err){
        console.log("Error while Connecting or Executing query",err)
     }


}