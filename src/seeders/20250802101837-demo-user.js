'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm dữ liệu vào bảng "Users"
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Khanh',
        lastName: 'Bui',
        email: 'Khanh@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Hoai',
        lastName: 'Anh',
        email: 'HoaiAnh@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả dữ liệu đã thêm vào bảng "Users"
    await queryInterface.bulkDelete('Users', null, {});
  }
};
