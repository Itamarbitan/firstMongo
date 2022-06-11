const { ObjectId } = require('mongodb');

async function main(){
    const MongoClient = require('mongodb').MongoClient;
    uri = "mongodb://localhost:27017";
    const instans = new MongoClient(uri)
    try {
        await instans.connect();

        console.log('im connected');

        // await insertProject(instans , {
        //     "training" : "gym",
        //     "timeInProject" : "3 years"
        // })

        await insertError(instans , {"Error" : "123"} , {'training' : "gym"});

        // await connectErrorId(instans ,  {"Error" : "123"})

        // await updateProject(instans , {"timeInProject" : "2 month"}, {"timeInProject" : "5 month"})

        // await deleteError(instans , {"_id" : ObjectId('629b292a64055bcccc1429ef')})

    }
    catch(err){
        console.log('there is an error' + err)
    }
    finally{
        instans.close();
        console.log('the connection was closed')
    }
}
main()


async function insertProject(instans , newProject){
    const res = await instans.db("Pms_HomeWork").collection("Projects").insertOne(newProject);
    console.log(res);
}


async function insertError(instans, newError , projectNewErr){
    const res = await instans.db("Pms_HomeWork").collection("Errors").insertOne(newError);
    const a = await instans.db("Pms_HomeWork").collection("Errors").findOne(newError);
    const x = await instans.db("Pms_HomeWork").collection('Projects').findOne(projectNewErr);
    const newField = await instans.db("Pms_HomeWork").collection('Projects').updateOne(x ,{$set : {'errorId' : a._id}} );
    console.log(newField);
}

// async function connectErrorId (instans, x){
//     console.log(

// }

async function updateProject(instans ,oldPar, updatedPar){
    const res = await instans.db("Pms_HomeWork").collection("Projects").updateOne({oldPar}, {$set:{updatedPar}});
    await console.log(res)
}

async function deleteError(instans , deletePar){
    const res = await instans.db("Pms_HomeWork").collection("Errors").deleteOne(deletePar);
    console.log(res)

}


