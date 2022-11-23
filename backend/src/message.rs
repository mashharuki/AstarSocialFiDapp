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
       * send message function
       */
      pub fn send_message_fn(
            &mut self,
            message: String,
            message_list_id: u128,
            sender_id: AccountId,
            created_time: String,
      ) {
            // get message liset
            let mut message_list: Vec<Message> = self.message_list_map.get(&message_list_id).unwrap_or(Vec::default());

            // push
            message_list.push(Message {
                  message,
                  sender_id,
                  created_time,
            });

            // overwrite messsage_list
            self.message_list_map.insert(&message_list_id, &message_list);
      }

      /**
       * get message list function
       */
      pub fn get_message_list_fn(&self, message_list_id: u128, num: usize) -> Vec<Message> {
            // get message liset
            let self_message_list: Vec<Message> = self.message_list_map.get(&message_list_id).unwrap();
    
            let mut message_list: Vec<Message> = Vec::new();
    
            let amount_index: usize = 5;
            let list_length: usize = self_message_list.len();
    
            // コントラクトに格納された投稿の量が指定された量の投稿より多いか判定。
            // それによって取得方法が異なるため
            if list_length < amount_index + 1 {
                  for m in 0..(list_length) {
                        // push
                        message_list.push(self_message_list[m].clone());
                  }
            } else {
                  for n in (amount_index * (num - 1))..(amount_index * num) {
                        // push
                        message_list.push(self_message_list[n].clone());
                  }
            }

            message_list
      }

      /**
       * get specific message function
       */
      pub fn get_last_message_fn(&self, message_list_id: u128) -> Message {
            // get last message
            let last_message: Message = self
                .message_list_map
                .get(&message_list_id)
                .unwrap()
                .last()
                .unwrap()
                .clone();

            last_message
      }

}