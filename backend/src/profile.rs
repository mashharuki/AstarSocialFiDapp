use crate::metadata::*;
use ink_env::AccountId;
use ink_prelude::string::String;
use ink_prelude::vec::Vec;

use crate::backend::Backend;

/**
 * functions
 */
impl Backend {

      /**
       * create profile function
       */ 
      pub fn create_profile_fn(&mut self, account_id: AccountId) {
            // 既にアカウントが作成されていないか確認
            let is_already_connected = self.profile_map.contains(&account_id);

            if !is_already_connected {
                  // insert
                  self.profile_map.insert(
                        &(account_id),
                        &Profile {
                              following_list: Vec::new(),
                              follower_list: Vec::new(),
                              friend_list: Vec::new(),
                              user_id: account_id,
                              name: None,
                              img_url: None,
                              message_list_id_list: Vec::new(),
                              post_id_list: Vec::new(),
                        },
                  );
            }
      }

      /**
       * set profile info function
       */ 
      pub fn set_profile_info_fn(
            &mut self, 
            account_id: AccountId, 
            name: String, 
            img_url: String
      ) {
            // get profile info
            let mut profile: Profile = self.profile_map.get(&account_id).unwrap();
            profile.name = Some(name);
            profile.img_url = Some(img_url);
            // overwrite
            self.profile_map.insert(&account_id, &profile);
      }
    
      /**
       * get profile info function
       */ 
      pub fn get_profile_info_fn(&self, account_id: AccountId) -> Profile {
            // get info
            let profile: Profile = self.profile_map.get(&account_id).unwrap();
            profile
      }
    
      /**
       * check profile status
       */
      pub fn check_created_profile_fn(&self, account_id: AccountId) -> bool {
            // check
            let is_already_connected = self.profile_map.contains(&account_id);
            is_already_connected
      }
}