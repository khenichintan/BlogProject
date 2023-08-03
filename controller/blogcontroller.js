const blog = require('../model/blogmodel');

const comment = require('../model/commentmodel');

const fs = require('fs');

const path = require('path');

module.exports.blog_add = async(req, res) => {
    return res.render('blog_add')
}

function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

module.exports.insertblog = async(req, res) => {
    try {

        var blogimg = ''
        if (req.file) {
            blogimg = blog.blogpath + "/" + req.file.filename;
        }
        req.body.image = blogimg;
        req.body.name = req.user.name;

        let a = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
        let s = join(new Date, a, '-');
        req.body.date = s;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await blog.create(req.body)
        if (data) {
            return res.redirect('/blog')
        } else {
            console.log("blog Photo Err");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.blog_view = async(req, res) => {

    try {
        if (req.query.status == 'deActive') {
            let Active = await blog.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await blog.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let serchdata = await blog.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            })
            .limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let slidedata = await blog.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let pageNum = Math.ceil(slidedata / per_page)

        return res.render('blog_view', {
            blogrecord: serchdata,
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

        let record = await blog.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '..', record.image)
            if (imagepath) {
                fs.unlinkSync(imagepath);
            }
        }

        let data = await blog.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/blog/blog_view')
        } else {
            console.log("delete error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.update = async(req, res) => {
    try {

        let data = await blog.findById(req.params.id)
        if (data) {
            return res.render('blog_update', {
                blogdata: data
            })
        } else {
            console.log("update err");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.updateblog = async(req, res) => {
    let blogi = req.body.blogid;
    try {
        if (req.file) {
            let data = await blog.findById(blogi)
            if (data) {
                var blogimg = path.join(__dirname, '..', data.image)
                if (blogimg) {
                    fs.unlinkSync(blogimg)
                }

                var newimg = blog.blogpath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await blog.findByIdAndUpdate(blogi, req.body)
                if (record) {
                    return res.redirect('/blog/blog_view')
                } else {
                    console.log("data is not update");
                }
            }
        } else {
            let data = await blog.findById(blogi)
            if (data) {
                req.body.image = data.image

                let record = await blog.findByIdAndUpdate(blogi, req.body)
                if (record) {
                    return res.redirect('/blog/blog_view')
                } else {
                    console.log("data is not update");
                }
            } else {
                console.log("data error");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async delet => {
            await blog.findByIdAndDelete(delet);
        });
        return res.redirect('/blog/blog_view')
    } catch (error) {

    }
};

module.exports.commentview = async(req, res) => {

    if (req.query.status == 'deActive') {
        let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: false });
    }
    if (req.query.status == 'Active') {
        let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: true });
    }
    let data = await comment.find({}).populate('oldid').exec();
    // console.log(data)
    return res.render('comment_view', {
        data
    })
}