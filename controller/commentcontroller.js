const comment = require('../model/commentmodel')

module.exports.insertcomment = async(req, res) => {
    try {
        var cimage = '';
        if (req.file) {
            cimage = comment.commentpath + "/" + req.file.filename
        }
        req.body.image = cimage;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let a = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
        let s = join(new Date, a, '-');
        // console.log(s);
        req.body.date = s;

        let data = await comment.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log("comment err", err);
        }
    } catch (error) {
        console.log(error);
    }
}

function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}