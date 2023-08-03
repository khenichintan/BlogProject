const review = require('../model/reviewmodel');

const path = require('path');

const fs = require('fs');

module.exports.review_add = async(req, res) => {
    return res.render('review_add')
};

module.exports.insertreview = async(req, res) => {
    try {

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = review.create(req.body)
        if (data) {
            return res.redirect('/review')
        } else {
            console.log("review error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.review_view = async(req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await review.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await review.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        var search = '';
        if (req.query.search) {
            search = req.query.search
        }

        var page = 1
        if (req.query.page) {
            page = req.query.page;
        }

        var per_page = 2;

        let serchdata = await review.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            })
            .limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let slidedata = await review.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let pageNum = Math.ceil(slidedata / per_page);

        return res.render('review_view', {
            reviewdata: serchdata,
            pageNum: pageNum,
            cpage: page,
            search: search
        })

    } catch (error) {

    }
}

module.exports.delete = async(req, res) => {
    try {
        let data = await review.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/review/review_view')
        } else {
            console.log("review not delete", err);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.update = async(req, res) => {
    try {
        let data = await review.findById(req.params.id);
        if (data) {
            return res.render('review_update', {
                reviewda: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.updatereview = async(req, res) => {
    let reviewid = req.body.reid
    try {
        let data = await review.findByIdAndUpdate(reviewid, req.body)
        if (data) {
            return res.redirect('/review/review_view')
        } else {
            console.log("update is not find", err);
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async delet => {
            await review.findByIdAndDelete(delet);
        });
        return res.redirect('/review/review_view')
    } catch (error) {

    }
};