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

        /**
         * プロフィール作成テストコード
         */
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

        /**
         * 投稿機能の確認コード
         */
        #[ink::test]
        fn test_post_release_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // 新しいアカウントを取得
            let alice_account_id = accounts().alice;

            // プロフィール作成する
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.create_profile();

            // プロフィール情報を設定
            astar_sns_contract.set_profile_info("Alice".to_string(), "https//ff...".to_string());

            // post
            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );

            // 投稿情報の確認
            let post_info: Post = astar_sns_contract
                .post_map
                .get(&(astar_sns_contract.post_map_counter - 1))
                .unwrap();
                debug_println!("post :{:?}\n", post_info);
        }

        /**
         * ユーザー全体の投稿を取得機能のテスト
         */
        #[ink::test]
        fn test_general_post_get_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // 新しいアカウントを取得
            let alice_account_id = accounts().alice;
            let bob_account_id = accounts().bob;
            let charlie_account_id = accounts().charlie;

            
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            // create profile
            astar_sns_contract.create_profile();

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            // create profile
            astar_sns_contract.create_profile();

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            // create profile
            astar_sns_contract.create_profile();

            // プロフィール情報を設定
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.set_profile_info("Alice".to_string(), "https//ff...".to_string());

            // multi post 
            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );
            astar_sns_contract.release_post(
                "I come to Thailand".to_string(),
                "12:35".to_string(),
                "https://gsdef...".to_string(),
            );
            astar_sns_contract.release_post(
                "Hello YouTube".to_string(),
                "12:40".to_string(),
                "https://fafds...".to_string(),
            );
            astar_sns_contract.release_post(
                "Oh baby, come on!".to_string(),
                "12:45".to_string(),
                "https://fsdfee...".to_string(),
            );
            astar_sns_contract.release_post(
                "Don't mention it!".to_string(),
                "12:50".to_string(),
                "https://fasee...".to_string(),
            );
            astar_sns_contract.release_post(
                "Do what you want".to_string(),
                "12:55".to_string(),
                "https://fasdfgeg...".to_string(),
            );

            // get general post
            let post_list: Vec<Post> = astar_sns_contract.get_general_post(1);
            debug_println!("General post get test\n",);

            for n in 0..(post_list.len()) {
                debug_println!("{:?}\n", post_list[n]);
            }
        }

        #[ink::test]
        fn test_individual_post_get_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // 新しいアカウントを取得
            let alice_account_id = accounts().alice;
            let bob_account_id = accounts().bob;
            let charlie_account_id = accounts().charlie;

            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.create_profile();
            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.create_profile();
            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.create_profile();

            // set profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.set_profile_info("Alice".to_string(), "https//ff...".to_string());
            // set profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.set_profile_info("Bob".to_string(), "https//ff...".to_string());
            // set profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.set_profile_info("Charlie".to_string(), "https//ff...".to_string());

            
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            // post from multi account
            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );
            astar_sns_contract.release_post(
                "Oh baby, come on!".to_string(),
                "12:45".to_string(),
                "https://fsdfee...".to_string(),
            );

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.release_post(
                "I come to Thailand".to_string(),
                "12:35".to_string(),
                "https://gsdef...".to_string(),
            );
            astar_sns_contract.release_post(
                "Don't mention it!".to_string(),
                "12:50".to_string(),
                "https://fasee...".to_string(),
            );

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.release_post(
                "Hello YouTube".to_string(),
                "12:40".to_string(),
                "https://fafds...".to_string(),
            );
            astar_sns_contract.release_post(
                "Do what you want".to_string(),
                "12:55".to_string(),
                "https://fasdfgeg...".to_string(),
            );

            // get post 
            let alice_post_list: Vec<Post> = astar_sns_contract.get_individual_post(1, alice_account_id);
            let bob_post_list: Vec<Post> = astar_sns_contract.get_individual_post(1, bob_account_id);
            let charlie_post_list: Vec<Post> = astar_sns_contract.get_individual_post(1, charlie_account_id);

            debug_println!("Individual post get test");
            
            for n in 0..(alice_post_list.len()) {
                debug_println!("{:?}", alice_post_list[n]);
            }
            for n in 0..(bob_post_list.len()) {
                debug_println!("{:?}", bob_post_list[n]);
            }
            for n in 0..(charlie_post_list.len()) {
                debug_println!("{:?}", charlie_post_list[n]);
            }
        }

        #[ink::test]
        fn test_add_likes_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // 新しいアカウントを取得
            let alice_account_id = accounts().alice;
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);

            // create profile
            astar_sns_contract.create_profile();

            // set profile info
            astar_sns_contract.set_profile_info("Alice".to_string(), "https//ff...".to_string());

            // post
            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );

            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );

            astar_sns_contract.release_post(
                "Today, it was so rainy!".to_string(),
                "12:30".to_string(),
                "https://sdfds...".to_string(),
            );

            // add likes
            astar_sns_contract.add_likes(0);

            debug_println!(
                "Number of likes: {}",
                astar_sns_contract.post_map.get(&0).unwrap().num_of_likes
            );
            // add likes
            astar_sns_contract.add_likes(0);
            astar_sns_contract.add_likes(1);
            astar_sns_contract.add_likes(2);

            debug_println!(
                "Number of likes: {}",
                astar_sns_contract.post_map.get(&0).unwrap().num_of_likes
            );

            // get total likes
            let total_likes = astar_sns_contract.get_total_likes(alice_account_id);
            debug_println!("alice total num of likes: {}", total_likes)
        }

        #[ink::test]
        fn test_follow_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // create accounts
            let alice_account_id = accounts().alice;
            let bob_account_id = accounts().bob;
            let charlie_account_id = accounts().charlie;

            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.create_profile();
            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.create_profile();
            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.create_profile();

            // confirm
            debug_println!(
                "message_list_map_counter: {}",
                astar_sns_contract.message_list_map_counter
            );

            
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            // follow
            astar_sns_contract.follow(bob_account_id);

            debug_println!(
                "following_list: {:?}\nfollower_list: {:?}",
                astar_sns_contract.get_following_list_fn(alice_account_id),
                astar_sns_contract.get_follower_list_fn(bob_account_id)
            );

            // confirm
            debug_println!(
                "message_list_map_id: {}",
                astar_sns_contract.message_list_map_counter
            );

            // follow (bob -> alice)
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.follow(alice_account_id);
            // confirm
            debug_println!(
                "message_list_map_counter: {}",
                astar_sns_contract.message_list_map_counter
            );

            // follow (alicw -> bob)
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.follow(bob_account_id);
            
            // confirm
            debug_println!(
                "message_list_map_counter: {}",
                astar_sns_contract.message_list_map_counter
            );

            // follow (alice -> charlie)
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.follow(charlie_account_id);
            // confirm
            debug_println!(
                "following_list: {:?}\nfollower_list: {:?}",
                astar_sns_contract.get_following_list_fn(alice_account_id),
                astar_sns_contract.get_follower_list_fn(charlie_account_id)
            );

            // confirm
            debug_println!(
                "message_list_map_counter: {}",
                astar_sns_contract.message_list_map_counter
            );
        }

        #[ink::test]
        fn test_message_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // create accounts
            let alice_account_id = accounts().alice;
            let bob_account_id = accounts().bob;
            let charlie_account_id = accounts().charlie;

            // create profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.create_profile();

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.create_profile();

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.create_profile();

            // set profile
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.set_profile_info("Alice".to_string(), "https//ff...".to_string());

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.set_profile_info("Bob".to_string(), "https//ff...".to_string());

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.set_profile_info("Charlie".to_string(), "https//ff...".to_string());

            // follow
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.follow(bob_account_id);
            astar_sns_contract.follow(charlie_account_id);

            // post
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.send_message(
                "Sorry Bro, I can't go today.".to_string(),
                0,
                "12:30".to_string(),
            );
            astar_sns_contract.send_message(
                "Why don't we go there tomorrow?".to_string(),
                0,
                "12:33".to_string(),
            );
            astar_sns_contract.send_message(
                "Hey, charlie will come!".to_string(),
                0,
                "12:35".to_string(),
            );
            astar_sns_contract.send_message(
                "He seems so muscular, so he would teach us.".to_string(),
                0,
                "12:36".to_string(),
            );
            astar_sns_contract.send_message(
                "Why don't we go there tomorrow?".to_string(),
                0,
                "12:37".to_string(),
            );
            // post from bob 
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(bob_account_id);
            astar_sns_contract.send_message(
                "I'm so looking forward that!".to_string(),
                0,
                "12:38".to_string(),
            );
            astar_sns_contract.send_message(
                "Hey bro! Tomorrow I and Bob go to gym. Don't you join us?".to_string(),
                1,
                "12:34".to_string(),
            );

            // confirm
            debug_println!(
                "message_list_alice_bob: {:?}\n",
                astar_sns_contract.get_message_list(0, 1)
            );
            debug_println!(
                "last_message_alice_bob: {:?}\n",
                astar_sns_contract.get_last_message(0)
            );
            debug_println!(
                "message_list_alice_charlie: {:?}",
                astar_sns_contract.get_message_list(1, 1)
            );
        }

        /**
         * FTコントラクトのテストコード
         */
        #[ink::test]
        fn FT_fn_works() {
            // コントラクトのインスタンス化
            let mut astar_sns_contract = Backend::new();

            // create accounts
            let alice_account_id = accounts().alice;
            let bob_account_id = accounts().bob;
            let charlie_account_id = accounts().charlie;

            // alice, bob, charlieのアカウントへそれぞれ100トークンを配布
            astar_sns_contract.distribute_fn(alice_account_id, 100);
            astar_sns_contract.distribute_fn(bob_account_id, 100);
            astar_sns_contract.distribute_fn(charlie_account_id, 100);

            // transfer token
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(alice_account_id);
            astar_sns_contract.transfer(bob_account_id, 50);

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(charlie_account_id);
            astar_sns_contract.transfer(bob_account_id, 50);

            // get balance info
            let alice_asset = astar_sns_contract.balance_of(alice_account_id);
            let bob_asset = astar_sns_contract.balance_of(bob_account_id);
            let charlie_asset = astar_sns_contract.balance_of(charlie_account_id);

            debug_println!("alice_asset:{}", alice_asset);
            debug_println!("bob_asset:{}", bob_asset);
            debug_println!("charlie_asset:{}", charlie_asset);
        }
    }
}
