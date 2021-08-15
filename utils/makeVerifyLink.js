import mailVerifySchema from "../dbSchemas/mailVerify.js";

const makeVerifyLink = async (req,data) => {
    //Declare Variables
    const email = data.email;
    const code = Math.floor(Math.random() * 10000000);
    //Store In Db
    const newEV = new mailVerifySchema({
        email: email,
        code: code
    })
    try {
        const saveEv = await newEV.save()
    } catch (err) {
        throw err
    }
    //Make Link
    // const Link = `${req.protocol}://${req.hostname}${req.originalUrl}${email}/${code}`
    const Link = `${process.env.FRONTEND_SITE}/verifyEmail/${email}/${code}`
    //Implant Email Send Logic,
    console.log(Link)

}

export default makeVerifyLink;