﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SampleMVC.Models;

namespace SampleMVC.Controllers
{
    public class PeopleController : Controller
    {
        private readonly testdbContext _context;

        public PeopleController(testdbContext context)
        {
            _context = context;
        }

        // GET: People
        //VIEW側の指定  @model IEnumerable<SampleMVC.Models.Person>
        public async Task<IActionResult> Index()
        {
            var result = await _context.Person
                .FromSqlRaw("SELECT * FROM PERSON")
                .ToListAsync();
            return View(result);
            //return View(await _context.Person.ToListAsync());
        }

        // GET: People/Details/5
        //VIEW側の指定  @model SampleMVC.Models.Person
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            //データを取得してViewに渡している
            var person = await _context.Person
                .FirstOrDefaultAsync(m => m.Id == id);
            if (person == null)
            {
                return NotFound();
            }

            return View(person);
        }

        // GET: People/Create
        //VIEW側の指定  @model SampleMVC.Models.Person
        public IActionResult Create()
        {
            return View();
        }

        // GET: People/Edit/5
        //VIEW側の指定  @model SampleMVC.Models.Person
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            //データを取得してViewに渡している
            var person = await _context.Person.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }
            return View(person);
        }

        // GET: People/Delete/5
        //VIEW側の指定  @model SampleMVC.Models.Person
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            //データを取得してViewに渡している
            var person = await _context.Person
                .FirstOrDefaultAsync(m => m.Id == id);
            if (person == null)
            {
                return NotFound();
            }

            return View(person);
        }

        // POST: People/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Age")] Person person)
        {
            if (ModelState.IsValid)
            {
                _context.Add(person);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(person);
        }

        // POST: People/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Age")] Person person)
        {
            if (id != person.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(person);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonExists(person.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(person);
        }

        // POST: People/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var person = await _context.Person.FindAsync(id);
            _context.Person.Remove(person);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        /// <summary>
        /// 引数のレコードが存在するか
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool PersonExists(int id)
        {
            return _context.Person.Any(e => e.Id == id);
        }









        public IActionResult AjaxTest(string text)
        {
            return View();
        }


        //ajax用のコントローラー(GET)
        [HttpGet]
        public IActionResult GetTest(string text = "デフォルト")
        {
            System.Diagnostics.Debug.WriteLine(text);

            System.Threading.Thread.Sleep(5000);

            return Json(new { returnText = text });
        }

        //ajax用のコントローラー(POST)
        [HttpPost]
        public IActionResult AjaxTest(Person entity)
        {
            //パラメーターの確認
            var grade = entity.Id;
            var no = entity.Name;
            var name = entity.Age;


            // クライアントに適当なJSONデータを返す
            var aaaa = new List<Person>();

            var res = new Person() { Id = 1, Name = "サーバーさん", Age = 40 };
            aaaa.Add(res);

            var res1 = new Person() { Id = 2, Name = "Jsonファイルさん", Age = 45 };
            aaaa.Add(res1);

            var res2 = new Person() { Id = 3, Name = "よみよみさん", Age = 46 };
            aaaa.Add(res2);

            return Json(aaaa);

        }

    }

}
