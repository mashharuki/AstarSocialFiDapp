#![cfg_attr(not(feature = "std"), no_std)]

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
    use ink_prelude::vec::Vec;
    use openbrush::storage::Mapping;
    use openbrush::test_utils::accounts;

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
    }

    impl Backend {

        /**
         * constructor 
         */
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                profile_map: Mapping::default(),
                post_map: Mapping::default(),
                post_map_counter: 0,
                message_list_map: Mapping::default(),
                message_list_map_counter: 0,
            }
        }

        /**
         * new function
         */
        #[ink(constructor)]
        pub fn default() -> Self {
            // call new function
            Self::new()
        }

        /**
         * debug fucntion
         */
        #[ink(message)]
        pub fn debug(&self) {
            debug_println!("Hello World!");
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

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let backend = Backend::default();
            assert_eq!(backend.debug(), "HelloWorld");
        }

    }
}
