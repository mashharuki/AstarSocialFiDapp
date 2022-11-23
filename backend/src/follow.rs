use crate::metadata::*;
use ink_env::AccountId;
use ink_prelude::vec::Vec;

use crate::backend::Backend;

/**
 * functions
 */
impl Backend {

      /**
       * follow function
       */
      pub fn follow_fn(
            &mut self, 
            following_account_id: AccountId, 
            followed_account_id: AccountId
      ) {

            // get following account info
            let mut following_user_profile: Profile = self.profile_map.get(&following_account_id).unwrap();
      
            //. get followed account info
            let mut followed_user_profile: Profile = self.profile_map.get(&followed_account_id).unwrap();
      
            // 自分のフォローするユーザーのウォレットアドレスを自分のフォローリストに追加
            if !following_user_profile
                  .following_list
                  .contains(&followed_account_id)
            {
                  // puch
                  following_user_profile
                        .following_list
                        .push(followed_account_id);
            }
  
            // 自分のウォレットアドレスを、自分のフォローするユーザーのフォロワーリストに追加
            if !followed_user_profile
                  .follower_list
                  .contains(&followed_account_id)
            {
                  // push
                  followed_user_profile
                        .follower_list
                        .push(following_account_id);
            }
  
            // get message list length
            let message_length: usize = following_user_profile.message_list_id_list.len();
            let message_length2: usize = followed_user_profile.message_list_id_list.len();
      
            // check message length
            if message_length == 0 && message_length2 == 0{
                  // 二人のメッセージ用のメッセージリストのIDをそれぞれに追加
                  followed_user_profile
                        .message_list_id_list
                        .push(self.message_list_map_counter);
                  following_user_profile
                        .message_list_id_list
                        .push(self.message_list_map_counter);
                  // push
                  following_user_profile.friend_list.push(followed_account_id);
                  followed_user_profile.friend_list.push(following_account_id);
                  // increment
                  self.message_list_map_counter = &self.message_list_map_counter + 1;
            }
  
            for n in 0..message_length {
                  // 自分の持っているメッセージリストのIDを、フォローする相手が持っていない
                  // 既に二人用のメッセージリストが作成されていないかを確認
                  let is_contained = followed_user_profile
                        .message_list_id_list
                        .contains(&following_user_profile.message_list_id_list[n]);
      
                  // もし含まれていなければ(メッセージリストが作成されていなければ)メッセージリストのIDを追加
                  if !is_contained {
                        // 二人のメッセージ用のメッセージリストのIDをそれぞれに追加
                        followed_user_profile
                              .message_list_id_list
                              .push(self.message_list_map_counter);
                        following_user_profile
                              .message_list_id_list
                              .push(self.message_list_map_counter);
                        // push
                        following_user_profile.friend_list.push(followed_account_id);
                        followed_user_profile.friend_list.push(following_account_id);
                        // increment
                        self.message_list_map_counter = &self.message_list_map_counter + 1;
                  }
            }
  
            // overwrite profile info
            self.profile_map.insert(&following_account_id, &following_user_profile);
            self.profile_map.insert(&followed_account_id, &followed_user_profile);
      }
  
      /**
       * get following list of specified account
       */
      pub fn get_following_list_fn(&self, account_id: AccountId) -> Vec<AccountId> {
            // get list from map
            let following_list: Vec<AccountId> = self.profile_map.get(&account_id).unwrap().following_list;
            following_list
      }
  
      /**
       * get follower list of specified account
       */
      pub fn get_follower_list_fn(&self, account_id: AccountId) -> Vec<AccountId> {
            // get list from map
            let follower_list: Vec<AccountId> = self.profile_map.get(&account_id).unwrap().follower_list;
            follower_list
      }
}