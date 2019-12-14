<?php

use Illuminate\Database\Seeder;



//----------------for include library--------------------------
/*use Illuminate\Database\Seeder;*/
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

//--------------------End Library-----------------------------

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       /* DB::table('users')->insert([
            'name' => Str::random(10).'Anil Kumar',
            'email' => Str::random(10).'anil@gmail.com',
            'password' => bcrypt('anil.com'),
        ]);*/


        $items = [
            
            ['id' => 1, 'name' => 'Anil Kumar', 'email' => 'anil@gmail.com', 'password' => '$2y$10$P9ld33sDoxbzcUds2DxWcuLsO3F3xJnQiKJ/BIm9txkv719IfgLI.', 'type' => 'Admin', 'remember_token' => '',],

        ];

        foreach ($items as $item) {
            \App\User::create($item);
        }
    }
}
