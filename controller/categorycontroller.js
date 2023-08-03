const category = require('../model/categorymodel');

const path = require('path');

const fs = require('fs');

module.exports.category_add = async(req, res) => {
    return res.render('category_add')
};

module.exports.insertcategory = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await category.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log("category");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.category_view = async(req, res) => {
    try {


        if (req.query.status == 'deActive') {
            let Active = await category.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await category.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        var per_page = 2;

        let data = await category.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            }).limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let data_count = await category.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        let pageNum = Math.ceil(data_count / per_page);


        let catdata = await category.find({})
        if (data) {
            res.render('category_view', ({
                categorydata: catdata,
                pageNum: pageNum,
                cpage: page,
                search: search
            }));
        } else {
            console.log("data error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.delete = async(req, res) => {
    try {

        let data = await category.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/category/category_view')
        } else {
            console.log("delete err", err);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await category.findById(req.params.id)
        if (data) {
            return res.render('category_update', {
                categorydata: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.updatecategory = async(req, res) => {
    let cateid = req.body.catid
    try {
        let data = await category.findByIdAndUpdate(cateid, req.body)
        if (data) {
            return res.redirect('/category/category_view')
        } else {
            console.log("update is not find");
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async delet => {
            await category.findByIdAndDelete(delet);
        });
        return res.redirect('/category/category_view')
    } catch (error) {

    }
};