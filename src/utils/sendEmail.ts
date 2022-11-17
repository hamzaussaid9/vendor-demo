import { send } from '@emailjs/browser';

export const sendEmail = async (to_name: string, message: string, email: string) => {
    console.log(to_name, email, message);
    send("service_y6ei9l8", "template_kv2mq8a", {
        from_name: 'Z Vendors',
        to_name,
        message,
        email
    }, "42pM772ce9RqgW0Sr")
        .then((res) => console.log(res.text))
        .catch(err => console.log(err.text));
}

export const generateResetLink = (token: string) => `The Reset password link is http://localhost:3000/auth/reset-password/${token}`;



// emailjs.send("service_y6ei9l8","template_kv2mq8a",{
//     from_name: "Z vendors",
//     to_name: "my name",
//     message: "mesage",
//     email: "email",
//     });