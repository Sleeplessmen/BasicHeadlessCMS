/**
 * scripts/seedProducts.js
 *
 * @description :: Seed danh sách sản phẩm mẫu sử dụng Waterline ORM.
 */

module.exports = async function () {
    console.time('SeedProducts');
    sails.log('🔧 Đang chạy seedProducts.js...');

    try {
        // 🧹 Xoá toàn bộ sản phẩm
        const deleted = await Product.destroy({}).fetch();
        sails.log(`🧹 Đã xoá ${deleted.length} sản phẩm cũ`);

        // ✅ Tạo mới danh sách sản phẩm
        const products = Array.from({ length: 20 }, (_, i) => ({
            name: `Sản phẩm ${i + 1}`,
            description: `Mô tả cho sản phẩm ${i + 1}`,
            price: Math.floor(Math.random() * 100000) + 10000
        }));

        const created = await Product.createEach(products).fetch();
        sails.log(`✅ Đã tạo ${created.length} sản phẩm mẫu`);

    } catch (err) {
        sails.log.error('❌ Lỗi khi chạy seedProducts:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedProducts');
};
