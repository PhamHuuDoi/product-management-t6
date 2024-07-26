module.exports.index = (req, res) => {
    res.render("admin/pages/profile/index", {
        pageTile: "Thông tin cá nhân"
    });
}