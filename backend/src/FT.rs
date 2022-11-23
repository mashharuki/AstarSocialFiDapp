use ink_env::AccountId;

use crate::backend::Backend;

/**
 * functions
 */
impl Backend {
      
      /**
       * get balance info
       */
      pub fn balance_of_fn(&self, account_id: AccountId) -> u128 {
            let asset = self.asset_mapping.get(&account_id).unwrap_or(0 as u128);
            asset
      }

      /**
       * transfer funtion
       */
      pub fn transfer_fn(&mut self, from_id: AccountId, to_id: AccountId, amount: u128) {
            // get balance info
            let mut to_asset = self.asset_mapping.get(&to_id).unwrap_or(0 as u128);
            let mut from_asset = self.asset_mapping.get(&from_id).unwrap_or(0 as u128);

            if from_asset < amount {
                  return;
            }

            to_asset = to_asset + amount;
            from_asset = from_asset - amount;
            // insert
            self.asset_mapping.insert(&to_id, &to_asset);
            // insert 
            self.asset_mapping.insert(&from_id, &from_asset);
      }

      /**
       * dstribute function
       */ 
      pub fn distribute_fn(&mut self, to_id: AccountId, amount: u128) {
            let mut to_asset = self.asset_mapping.get(&to_id).unwrap_or(0 as u128);
            to_asset = to_asset + amount;
            // insert
            self.asset_mapping.insert(&to_id, &to_asset);
      }
}