#![cfg_attr(not(feature = "std"), no_std)]

mod FT;
mod follow;
mod message;
mod metadata;
mod post;
mod profile;

use ink_lang as ink;


#[ink::contract]
mod backend {

    use ink_env::debug_println;
    use ink_lang::codegen::Env;
    use ink_prelude::string::String;
    use ink_prelude::vec::Vec;
    use openbrush::storage::Mapping;
    use openbrush::test_utils::*;

    pub use crate::follow::*;
    pub use crate::message::*;
    pub use crate::metadata::*;
    pub use crate::post::*;

    /**
     * Contract Struct
     */
    #[ink(storage)]
    pub struct Backend {
        pub profile_map: Mapping<AccountId, Profile>,
        pub post_map: Mapping<u128, Post>,
        pub post_map_counter: u128,
        pub message_list_map: Mapping<u128, Vec<Message>>,
        pub message_list_map_counter: u128,
        pub asset_mapping: Mapping<AccountId, u128>,
    }

    /**
     * functions
     */
    impl Backend {

        /**
         * constructor 
         */
        #[ink(constructor, payable)]
        pub fn new() -> Self {
            Self {
                profile_map: Mapping::default(),
                post_map: Mapping::default(),
                post_map_counter: 0,
                message_list_map: Mapping::default(),
                message_list_map_counter: 0,
                asset_mapping: Mapping::default(),
            }
        }

        /**
         * post function
         */
        #[ink(message)]
        pub fn release_post(
            &mut self,
            description: String,
            created_time: String,
            post_img_url: String,
        ) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call fuction
            self.release_post_fn(caller, description, created_time, post_img_url);
        }

        /**
         * get general post list function
         */
        #[ink(message)]
        pub fn get_general_post(&self, num: u128) -> Vec<Post> {
            // call fuction
            let general_post_list = self.get_general_post_fn(num);
            general_post_list
        }

        /**
         * get post list specific account
         */
        #[ink(message)]
        pub fn get_individual_post(&self, num: u128, account_id: AccountId) -> Vec<Post> {
            // call fuction
            let individual_post_list = self.get_individual_post_fn(num, account_id);
            individual_post_list
        }

        /**
         * add likes function
         */
        #[ink(message)]
        pub fn add_likes(&mut self, post_id: u128) {
            // call function
            self.add_likes_fn(post_id);
        }

        /**
         * send message function
         */
        #[ink(message)]
        pub fn send_message(
            &mut self,
            message: String,
            message_list_id: u128,
            created_time: String,
        ) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call function
            self.send_message_fn(message, message_list_id, caller, created_time);
        }

        /**
         * get message list function
         */
        #[ink(message)]
        pub fn get_message_list(&self, message_list_id: u128, num: u128) -> Vec<Message> {
            // get message list
            let message_list: Vec<Message> = self.get_message_list_fn(message_list_id, num as usize);
            message_list
        }

        /**
         * get last message function
         */
        #[ink(message)]
        pub fn get_last_message(&self, message_list_id: u128) -> Message {
            // call function
            let message: Message = self.get_last_message_fn(message_list_id);
            message
        }

        /**
         * create profile function
         */
        #[ink(message)]
        pub fn create_profile(&mut self) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call function
            self.create_profile_fn(caller);
        }

        /**
         * set profile info function
         */
        #[ink(message)]
        pub fn set_profile_info(&mut self, name: String, img_url: String) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call function
            self.set_profile_info_fn(caller, name, img_url);
        }

        /**
         * follow function
         */
        #[ink(message)]
        pub fn follow(&mut self, followed_account_id: AccountId) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call function
            self.follow_fn(caller, followed_account_id);
        }

        /**
         * get following list function
         */
        #[ink(message)]
        pub fn get_following_list(&self, account_id: AccountId) -> Vec<AccountId> {
            // get following list
            let following_list: Vec<AccountId> = self.get_following_list_fn(account_id);
            following_list
        }

        /**
         * get profile ingo function
         */
        #[ink(message)]
        pub fn get_profile_info(&self, account_id: AccountId) -> Profile {
            // get profile info
            let profile: Profile = self.get_profile_info_fn(account_id);
            profile
        }

        /**
         * check created info
         */ 
        #[ink(message)]
        pub fn check_created_info(&self, account_id: AccountId) -> bool {
            // check created info
            let is_already_connected: bool = self.check_created_profile_fn(account_id);
            is_already_connected
        }

        /**
         * get total likes function
         */
        #[ink(message)]
        pub fn get_total_likes(&self, account_id: AccountId) -> u128 {
            // get likes
            let num_of_likes = self.get_total_likes_fn(account_id);
            num_of_likes
        }

        /**
         * get balance of token function
         */
        #[ink(message)]
        pub fn balance_of(&self, account_id: AccountId) -> u128 {
            // get balance info
            let asset = self.balance_of_fn(account_id);
            asset
        }

        /**
         * transfer token function
         */
        #[ink(message)]
        pub fn transfer(&mut self, to_id: AccountId, amount: u128) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // call transfer fucntion
            self.transfer_fn(caller, to_id, amount);
        }

        /**
         * distribute token funciton
         */
        #[ink(message)]
        pub fn distribute_refer_likes(&mut self) {
            // get account ID
            let caller: AccountId = self.env().caller();
            // get likes
            let total_likes = self.get_total_likes_fn(caller);
            // get balance
            let asset = self.balance_of_fn(caller);

            let calculated_amount = total_likes * 20;
            
            if asset < calculated_amount {
                // call distribute function
                self.distribute_fn(caller, calculated_amount - asset);
            }
        }
    }

    /**
     * test code
     */
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        /// Imports `ink_lang` so we can use `#[ink::test]`.
        use ink_lang as ink;
        use ink_env::debug_println;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn test_profile_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // 新しいアカウントを取得
            let alice_account_id = accounts().alice;
            // set caller
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);

            // プロフィール作成
            astar_sns_contract.create_profile();

            // プロフィール情報を設定
            astar_sns_contract.set_profile_info("mash".to_string(), "https//ff...".to_string());

            // プロフィール情報の確認
            debug_println!(
                "profile_list: {:?}",
                astar_sns_contract
                    .profile_map
                    .get(&alice_account_id)
                    .unwrap()
            );
        }

    }
}
