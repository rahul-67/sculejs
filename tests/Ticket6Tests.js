/**
 * Copyright (c) 2013, Dan Eyles (dan@irlgaming.com)
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of IRL Gaming nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL IRL Gaming BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var scule   = require('../lib/com.scule.db');

exports['test Ticket6'] = function(beforeExit, assert) {
    scule.dropAll();
    var collection = scule.factoryCollection('scule+dummy://test');
    for (var i=0; i < 100; i++) {
        collection.save({i: i});
    }
    var o = null;
    o = collection.find({}, {$skip:5});
    assert.equal(95, o.length);
    assert.equal(o[0].i, 5);
    
    o = collection.find({}, {$skip:5, $limit:10});
    assert.equal(10, o.length);
    assert.equal(o[0].i, 5);
    assert.equal(o[9].i, 14);
  
    o = collection.find({}, {$skip:5, $limit:10, $sort:{i:-1}});
    assert.equal(10, o.length);
    assert.equal(o[0].i, 94);
    assert.equal(o[9].i, 85);

    o = collection.find({}, {$skip:100});
    assert.equal(o.length, 0);

    o = collection.find({i:{$gte:50}}, {$skip:30});
    assert.equal(o.length, 20);
    assert.equal(o[0].i, 80);
    assert.equal(o[19].i, 99);

};