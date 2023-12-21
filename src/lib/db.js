import mysql from "mysql2/promise"

export async function query({query, values=[]}) {
    console.log(process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST,"HOST,DB")
    try{
    const dbConnection = await mysql.createConnection({
        host: process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST||"142.93.222.244",
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE||"tumxrxnsjk",
        user:process.env.NEXT_PUBLIC_MYSQL_USER||"tumxrxnsjk",
        password:process.env.NEXT_PUBLIC_MYSQL_PASSWORD || "ANmf2jPfXn"
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