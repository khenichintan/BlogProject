const offer = require('../model/offermodel');

const path = require('path');

module.exports.offer_add = async(req, res) => {

    return res.render('offer_add')
};

module.exports.insertoffer = async(req, res) => {
    try {

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = offer.create(req.body)
        if (data) {
            return res.redirect('/offer')
        } else {
            console.log("offer error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.offer_view = async(req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await offer.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await offer.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let data = await offer.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            }).limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let data_count = await offer.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        let pageNum = Math.ceil(data_count / per_page);

        if (data) {
            res.render('offer_view', ({
                offerdata: data,
                pageNum: pageNum,
                cpage: page,
                search: search
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.delete = async(req, res) => {
    try {
        let data = await offer.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/offer/offer_view')
        } else {
            console.log("offer not delete", err);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async delet => {
            await offer.findByIdAndDelete(delet);
        });
        return res.redirect('/offer/offer_view')
    } catch (error) {

    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await offer.findById(req.params.id);

        if (data) {
            return res.render('offer_update', {
                offerda: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.updateoffer = async(req, res) => {
    let offerid = req.body.oid
    try {
        let data = await offer.findByIdAndUpdate(offerid, req.body)
        if (data) {
            return res.redirect('/offer/offer_view')
        } else {
            console.log("update is not find");
        }
    } catch (error) {
        console.log(error)
    }
}