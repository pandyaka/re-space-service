import { getManager } from "typeorm";
import { User } from "../entities/user";

class UserService {
    userRepository: any;
    
    /**
     * @description Create an instance of UserService
     */
    constructor () {
      // Create instance of Data Access layer using our desired model
      this.userRepository = getManager().getRepository(User);
    }
  
    /**
     * @description Attempt to create a post with the provided object
     * @param userToCreate {object} Object containing all required fields to
     * create post
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async create ( userToCreate: any ) {
      try {
        const result = await this.userRepository.create( userToCreate );
        return { success: true, body: result };
      } catch ( err ) {
        return { success: false, error: err };
      }
    }
  }
  
export default UserService;