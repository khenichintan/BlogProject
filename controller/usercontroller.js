const slider = require('../model/slidermodel');

const offer = require('../model/offermodel');

const recent = require('../model/recentphotomodel');

const review = require('../model/reviewmodel');

const blog = require('../model/blogmodel');

const comment = require('../model/commentmodel');

const category = require('../model/categorymodel');

const subcategory = require('../model/subcategorymodel');

const fs = require('fs');

const path = require('path');

const nodemailer = require('nodemailer');
const { error } = require('console');

module.exports.index = async(req, res) => {
    let data = await slider.find({ isActive: true });
    let odata = await offer.find({ isActive: true });
    let redata = await recent.find({ isActive: true });
    let revidata = await review.find({ isActive: true });
    let blogr = await blog.find({ isActive: true });
    if (data) {
        return res.render('userview/index', {
            slider: data,
            offer: odata,
            recentph: redata,
            reviewdata: revidata,
            blogr: blogr
        })
    }
};

module.exports.blog_single = async(req, res) => {
    let id = req.query.id
        // console.log(id);
    try {
        let data = await blog.findById(id);
        let pdata = await blog.find({})
        let cdata = await comment.find({ oldid: id, isActive: true });
        let datacount = await comment.find({ isActive: true }).countDocuments();

        let recpost = await blog.find({ isActive: true }).sort({ _id: -1 }).limit(3);

        let pagedata = [];
        pdata.map((v, i) => {
            pagedata.push(v.id)
        })
        var next = pagedata.indexOf(id);


        if (data) {
            return res.render('userview/blog_single', {
                data,
                cdata,
                datacount,
                next,
                pre: next,
                pagedata,
                recpost
            })
        } else {
            console.log("data not found", err);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.filtergallery = async(req, res) => {

    let categoryr = await category.find({ isActive: true })
    let subcategoryr = await subcategory.find({ isActive: true })
    return res.render('userview/filtergallery', {
        categoryr,
        subcategoryr
    })
};

module.exports.contact = async(req, res) => {
    try {
        return res.render('userview/contact')
    } catch (error) {
        console.log(error, 'contact');
    }
};

module.exports.contact_mail = async(req, res) => {
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a77aec8d4160be",
                pass: "e9fddb09825682"
            }
        });
        let info = await transport.sendMail({
            from: 'chintan@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.message, // plain text body
        });
        return res.render('userview/contact')
    } catch (error) {
        console.log(error, 'contact mail');
    }
};