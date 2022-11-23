use crate::metadata::*;
use ink_env::AccountId;
use ink_prelude::string::String;
use ink_prelude::string::ToString;
use ink_prelude::vec::Vec;

use crate::backend::Backend;

impl Backend {

      /**
       * post funciton
       */
      pub fn release_post_fn(
            &mut self,
            account_id: AccountId,
            description: String,
            created_time: String,
            post_img_url: String,
      ) {
            // get profile
            let profile_info: Profile = self.profile_map.get(&account_id).unwrap();

            // insert
            self.post_map.insert(
                  &(self.post_map_counter),
                  &Post {
                        name: profile_info.name.unwrap_or("unknown".to_string()),
                        user_id: profile_info.user_id,
                        created_time,
                        img_url: post_img_url,
                        user_img_url: profile_info.img_url.unwrap(),
                        description: description,
                        num_of_likes: 0,
                        post_id: self.post_map_counter,
                  },
            );

            // 指定されたウォレットアドレスに紐づいたプロフィール
            let mut profile: Profile = self.profile_map.get(&account_id).unwrap();

            // push id
            profile.post_id_list.push(self.post_map_counter);

            // insert. (overwrite id)
            self.profile_map.insert(&account_id, &profile);

            // increment
            self.post_map_counter = &self.post_map_counter + 1;
      }

      /**
       * get post list
       */
      pub fn get_general_post_fn(&self, num: u128) -> Vec<Post> {
            // crete list
            let mut post_list: Vec<Post> = Vec::new();
            let length: u128 = self.post_map_counter;
            let amount_index: u128 = 5;

            // コントラクトに格納された投稿の量が指定された量の投稿より多いか判定。
            // それによって取得方法が異なるため
            if length < amount_index + 1 {
                  for m in 0..(length + 1) {
                        // get post
                        let post: Option<Post> = self.post_map.get(&m);
                        // create list
                        if post.is_some() {
                              post_list.push(post.unwrap());
                        }
                  }
            } else {
                  for n in (amount_index * (num - 1))..(amount_index * num) {
                        // get post
                        let post: Option<Post> = self.post_map.get(&(length - n - 1));
                        // create list
                        if post.is_some() {
                              post_list.push(post.unwrap());
                        }
                  }
            }
            // 返り値用のリストを返す。
            post_list
      }

      /**
       * get post list of account
       */
      pub fn get_individual_post_fn(&self, num: u128, account_id: AccountId) -> Vec<Post> {
            // crete list
            let mut post_list: Vec<Post> = Vec::new();
            // get post id
            let post_id_list: Vec<u128> = self.profile_map.get(&account_id).unwrap().post_id_list;

            let amount_index: u128 = 5;
            let length: u128 = post_id_list.len() as u128;

            // コントラクトに格納された投稿の量が指定された量の投稿より多いか判定。
            // それによって取得方法が異なるため
            if length < amount_index + 1 {
                  for m in 0..(length) {
                        // 指定された投稿を取得して、最初に生成されたリストに格納
                        let post: Option<Post> = self.post_map.get(&post_id_list[m as usize]);
                        // push
                        if post.is_some() {
                              post_list.push(post.unwrap());
                        }
                  }
            } else {
                  for n in (amount_index * (num - 1))..(amount_index * num) {
                        // 指定された投稿を取得して、最初に生成されたリストに格納
                        let post: Option<Post> = self.post_map.get(&post_id_list[(length - n - 1) as usize]);
                        // push 
                        if post.is_some() {
                              post_list.push(post.unwrap());
                        }
                  }
            }
            // 返り値用のリストを返す。
            post_list
      }

      /**
       * add like function
       */
      pub fn add_likes_fn(&mut self, post_id: u128) {
            // get post info
            let mut post: Post = self.post_map.get(&post_id).unwrap();

            // incremnet
            post.num_of_likes = &post.num_of_likes + 1;

            // 指定した投稿の情報を上書き
            self.post_map.insert(&post_id, &post);
      }

      /**
       * get total of likes function
       */
      pub fn get_total_likes_fn(&self, account_id: AccountId) -> u128 {
            // get post id lists
            let post_id_list = self.profile_map.get(&account_id).unwrap().post_id_list;

            let mut num_of_likes = 0;

            // increment in loop
            for id in post_id_list {
                  let likes_of_post = self.post_map.get(&id).unwrap().num_of_likes;
                  // increment
                  num_of_likes = num_of_likes + likes_of_post;
            }

            // return
            num_of_likes
      }
}