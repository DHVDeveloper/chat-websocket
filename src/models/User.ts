import { Schema, model, models } from 'mongoose';


var validateEmail = function (email: string) {
    var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            unique: true,
            trim: true,
            minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
            maxlength: [30, 'El nombre de usuario no puede tener más de 30 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validateEmail, 'Por favor ingresa un correo electrónico válido'],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            trim: true,
            minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
            validate: {
                validator: function (v: string) {
                    return /[a-zA-Z]/.test(v) && /\d/.test(v); 
                },
                message: 'La contraseña debe contener al menos una letra y un número',
            },
        },
        online: {
            type: Boolean,
            default: true,
        },
        chatRooms: [{ type: Schema.Types.ObjectId, ref: 'ChatRoom' }],
    },
    {
        timestamps: true, 
    }
);

export default models.User || model('User', userSchema);
