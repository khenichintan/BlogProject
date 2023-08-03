const category = require('../model/categorymodel');

const subcategory = require('../model/subcategorymodel');

const path = require('path');

const fs = require('fs');

module.exports.subcategory_add = async(req, res) => {
    try {
        let data = await category.find({});
        if (data) {
            return res.render('subcategory_add', {
                data: data
            })
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.insertsubcate = async(req, res) => {
    try {
        var subimage = '';
        if (req.file) {
            subimage = subcategory.upPath + '/' + req.file.filename;
        }
        req.body.image = subimage;

        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.updatedAt = nDate;
        req.body.createdAt = nDate;

        let data = await subcategory.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log("subcaterogy err");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.subcategory_view = async(req, res) => {

    try {

        if (req.query.status == 'deActive') {
            let Active = await subcategory.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await subcategory.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let serchdata = await subcategory.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            })
            .limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let slidedata = await subcategory.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let pageNum = Math.ceil(slidedata / per_page);

        return res.render('subcategory_view', {
            subcategorydata: serchdata,
            pageNum: pageNum,
            cpage: page,
            search: search
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports.delete = async(req, res) => {
    try {
        let record = await subcategory.findById(req.params.id);
        if (record) {
            var imagepath = path.join(__dirname, '..', record.image)
            if (imagepath) {
                fs.unlinkSync(imagepath)
            }
        }

        let data = await subcategory.findByIdAndDelete(req.params.id);
        if (data) {
            return res.redirect('/subcategory/subcategory_view')
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await subcategory.findById(req.params.id);
        if (data) {
            return res.render('subcategory_update', {
                subcategory: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.updatesubcate = async(req, res) => {
    let subid = req.body.subcate;
    try {
        if (req.file) {
            let data = await subcategory.findById(subid)
            if (data) {
                var sliderimg = path.join(__dirname, '..', data.image)
                if (sliderimg) {
                    fs.unlinkSync(sliderimg)
                }

                var newimg = subcategory.upPath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await subcategory.findByIdAndUpdate(subid, req.body)
                if (record) {
                    return res.redirect('/subcategory/subcategory_view')
                } else {
                    console.log("data not update");
                }
            }
        } else {
            let data = await subcategory.findById(subid)
            if (data) {
                req.body.image = data.image;

                let record = await subcategory.findByIdAndUpdate(subid, req.body)
                if (record) {
                    return res.redirect('/subcategory/subcategory_view')
                } else {
                    console.log("data not update");
                }
            } else {
                console.log("data not update");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await subcategory.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await subcategory.findByIdAndDelete(element);
        });
        return res.redirect('/subcategory/subcategory_view');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}