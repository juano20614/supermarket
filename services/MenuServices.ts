import UserRepository from '../repositories/User';

class MenuService {
    static async getAllMenu() {
        return await UserRepository.getAllMenu();
      }
}
export default MenuService;