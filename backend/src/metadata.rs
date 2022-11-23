use ink_env::AccountId;
use ink_prelude::string::String;
use ink_prelude::vec::Vec;
use ink_storage::traits::{PackedLayout, SpreadLayout, StorageLayout};

/**
 * Post Struct
 */
#[derive(Debug, Clone, scale::Encode, scale::Decode, SpreadLayout, PartialEq, PackedLayout)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct Post {
    pub name: String,
    pub user_id: AccountId,
    pub created_time: String,
    pub img_url: String,
    pub user_img_url: String,
    pub description: String,
    pub num_of_likes: u128,
    pub post_id: u128,
}

/**
 * Profile Struct
 */
#[derive(Debug, Clone, scale::Encode, scale::Decode, SpreadLayout, PartialEq, PackedLayout)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct Profile {
    pub following_list: Vec<AccountId>,
    pub follower_list: Vec<AccountId>,
    pub friend_list: Vec<AccountId>,
    pub user_id: AccountId,
    pub name: Option<String>,
    pub img_url: Option<String>,
    pub message_list_id_list: Vec<u128>,
    pub post_id_list: Vec<u128>,
}

/**
 * message Struct
 */
#[derive(Debug, Clone, scale::Encode, scale::Decode, SpreadLayout, PartialEq, PackedLayout)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct Message {
    pub message: String,
    pub sender_id: AccountId,
    pub created_time: String,
}