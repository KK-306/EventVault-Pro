const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim: true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["admin","manager","viewer"],
        default:"viewer"
    },

    status:{
        type:String,
        enum:["pending", "active", "rejected", "suspended"],
        default:"pending"
    },

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    approvedAt: {
        type: Date,
        default: null
    },

    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    rejectedAt: {
        type: Date,
        default: null
    },

    suspendedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    suspendedAt: {
        type: Date,
        default: null
    },

    profileImage:{
        type:String,
        default:""
    },

    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpire: {
        type: Date,
    }
},
{
    timestamps:true
}
);

userSchema.index({ email: 1 });
userSchema.index({ status: 1, role: 1 });

module.exports = mongoose.model("User",userSchema);
