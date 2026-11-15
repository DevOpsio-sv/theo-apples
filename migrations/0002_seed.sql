INSERT INTO categories (slug, name, description, sort_order) VALUES
  ('theo-apples', 'Theo Apples', 'The signature wooden apple collection.', 1),
  ('sculpture', 'Sculpture', 'Figurative and abstract sculpture.', 2),
  ('furniture', 'Furniture', 'Collectible functional objects.', 3);

INSERT INTO redirects (source_path, destination_path) VALUES
  ('/blog', '/journal'),
  ('/shop', '/works');

INSERT INTO site_settings (key, value) VALUES
  ('site_name', '"Theo Apples"'),
  ('currency', '"EUR"');
