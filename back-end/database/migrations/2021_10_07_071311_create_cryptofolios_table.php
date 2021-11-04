<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCryptofoliosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cryptofolios', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->text('name');
            $table->bigInteger('price');
            $table->integer('amount');
            $table->bigInteger('total_value');
            $table->timestamp('bought_on');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cryptofolios');
    }
}
