import { Datasource } from "./configurations/datasource.config";

async function create() {
    await Datasource.initialize();
    console.log("Database connection established successfully.");
    const user = Datasource.getRepository("User");
    await user.save({
        name: "John Doe",
        email: "alliano@gmail.com",
        password: "123456",
    });



    const result = await user.findOne({
        where: {
            email: "alliano@gmail.com",
        },
    });
    console.log(result);
    
}

create().then(() => {
    console.log("Database connection established successfully.");
}).catch((error) => {
    console.error("Error establishing database connection:", error);
});