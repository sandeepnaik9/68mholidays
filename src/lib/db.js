import mysql from "mysql2/promise"

export async function query({query, values=[]}) {
    console.log(process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST,"HOST,DB")
    try{
    const dbConnection = await mysql.createConnection({
        host: process.env.NEXT_PUBLIC_MYSQL_HOSTMYSQL_HOST||"dbaas-db-1763402-do-user-15429281-0.c.db.ondigitalocean.com",
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE||"defaultdb",
        port:25060,
        user:process.env.NEXT_PUBLIC_MYSQL_USER||"doadmin",
        password:process.env.NEXT_PUBLIC_MYSQL_PASSWORD || "AVNS_Xb16_7AbbVMHkCpIbn3",
    
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